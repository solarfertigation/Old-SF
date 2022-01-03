var includes = require('array-includes');
const sqlite = require("./aa-sqlite")
var schedule = require('node-schedule')
const moment = require('moment');
const { kalive, user, clean, pass, zones, ferts, recirc, url, hash } = require('../config');
var Gpio = require('onoff').Gpio

var mqtt = require('mqtt');
var shortid = require('shortid');

var settings = {
  keepalive: kalive,
  clientId: 'sched_slave_'+shortid.generate(),
  username: user,
  clean: clean,  
  password: pass
}

var client = mqtt.connect(url, settings);
client.on('connect', function () {
    console.log("connected!")
});

module.exports = {

    firstopen: async function opendb() {

        console.log(await sqlite.open('./fertevents.db'))

        // Adds a table

        var r = await sqlite.run(`CREATE TABLE if not exists sched_event_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fert_details TEXT,
        zone string TEXT,
        water_time INTEGER,
        start_date TEXT, 
        state TEXT,
        uuid TEXT);`)
        if (r) console.log("Table created")
    },

schedall: async function getall(){
    await sqlite.close();
    console.log("db closed")
    await sqlite.open('./fertevents.db')
    
    console.log("Get all events:")
    
    var sql = `SELECT * FROM sched_event_details WHERE state IS NOT "completed" AND state IS NOT "running"`;
    r = await sqlite.all(sql, [])
    r.forEach(function(row) {
        var isrecirc = false
        fert_data = JSON.parse(row.fert_details);
        var duration = [];
        console.log(fert_data)
        for (j in fert_data) {
            if (fert_data[j].fert_quantity>0) {
                isrecirc = true
                var fert = new Object();
                console.log("fert_data", fert_data[j].fert);
                duration.push(parseInt(fert_data[j].fert_quantity));
                fert.duration = parseInt(fert_data[j].fert_quantity);
                console.log("fert durations", duration);
                fert.start = new Date(row.start_date)
                fert.stop = new Date(fert.start.getTime() + fert.duration*60000);
                fert.gpio = ferts[fert_data[j].fert-1]
                activate(fert.gpio,fert.start, fert.stop,row.id, "fertilizing")    
                console.log("fertilizer mixing action",fert.gpio,fert.start, fert.stop,row.id)    
            }
            
        }
        if (isrecirc){
            var fert_max = Math.max.apply(null, duration);
            var recirculation = new Object();
            recirculation.duration = 1;
            recirculation.start = new Date(fert.start.getTime() + fert_max*60000)
            recirculation.stop = new Date(recirculation.start.getTime() + recirculation.duration*60000);
            recirculation.gpio = recirc;
            activate(recirculation.gpio,recirculation.start, recirculation.stop,row.id, "recirculating")
            console.log("recirculation action",recirculation.gpio,recirculation.start, recirculation.stop,row.id)
            var water = new Object();
            water.duration = parseInt(row.water_time)/* *60 */; //controlla la questione minuti e secondi
            water.start = new Date(recirculation.start.getTime() + recirculation.duration*60000)
            water.stop = new Date(water.start.getTime() + water.duration*60000);
            water.gpio = zones[row.zone-1]
            console.log("water duration", water.duration);
            activate(water.gpio,water.start, water.stop,row.id, "finishing")
            console.log("irrigation action",water.gpio,water.start, water.stop,row.id)
        }
        var water = new Object();
        water.duration = parseInt(row.water_time)/* *60 */; //controlla la questione minuti e secondi
        water.start = new Date(row.start_date)
        water.stop = new Date(water.start.getTime() + water.duration*60000);
        water.gpio = zones[row.zone-1]
        console.log("water duration", water.duration);
        activate(water.gpio,water.start, water.stop,row.id, "finishing")
        console.log("irrigation action",water.gpio,water.start, water.stop,row.id)
    })
},


insert_received: async function insert(topic, message) {
    await sqlite.close();
    console.log("db closed")
    await sqlite.open('./fertevents.db')
    eventdata = JSON.stringify(message.fertilizers);
    var sql = "INSERT INTO sched_event_details(fert_details, zone, water_time, start_date, state, uuid) VALUES (?, ?, ?, ?, ?, ?)"
    var prms = [eventdata, message.zone, message.water_time, message.start_date, message.state, message.id]
    r = await sqlite.run(sql,prms, error => console.log(error));
    if (r){
        console.log("Inserted.");}
},

deletion: async function deletevent(message) {
    await sqlite.close();
    console.log("db closed")
    await sqlite.open('./fertevents.db')
    let sql = 'DELETE FROM sched_event_details WHERE uuid=$id'
    console.log(message.id)
    $id = message.id
    await sqlite.run(sql, $id, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(`Row(s) deleted ${this.changes}`);
      });
    },


    insert_received: async function insert(topic, message) {
        await sqlite.close();
        console.log("db closed")
        await sqlite.open('./fertevents.db')
        eventdata = JSON.stringify(message.fertilizers);
        var sql = "INSERT INTO sched_event_details(fert_details, zone, water_time, start_date, state, id) VALUES (?, ?, ?, ?, ?, ?)"
        var prms = [eventdata, message.zone, message.water_time, message.start_date, message.state, message.id]
        r = await sqlite.run(sql, prms, error => console.log(error));
        if (r) {
            console.log("Inserted.");
        }
    },

    deletion: async function deletevent(message) {
        await sqlite.close();
        console.log("db closed")
        await sqlite.open('./fertevents.db')
        let sql = 'DELETE FROM sched_event_details WHERE uuid=$id'
        console.log(message.id)
        $id = message.id
        await sqlite.run(sql, $id, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(`Row(s) deleted ${this.changes}`);
        });
    },

    modify: async function modevent(message) {
        await sqlite.close();
        console.log("db closed")
        await sqlite.open('./fertevents.db')
        let sql = "UPDATE sched_event_details SET fert_details = $eventdata,zone = ?, water_time = ?, start_date = ?, state = ? WHERE id = ?"
        $id = JSON.stringify(message.id)
        eventdata = JSON.stringify(message.fertilizers);
        data = [eventdata, message.zone, message.water_time, message.start_date, message.state, message.id]
        await sqlite.run(sql, data, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(`Row(s) changed ${this.changes}`);
        });
    }
}//<===EXPORT END<===

var activate = function (output, start, stop, id, eventType) {
    let out = new Gpio(output, 'out')
    // let now = start.split(",")
    // let end = stop.split(",")
    let starting = start
    let ending = stop
    console.log("starting at", starting)
    console.log("ending at", ending)
    console.log("PREPARE ELECTROVALVES ==> Turning on valve " + output)
    var job = schedule.scheduleJob(starting, function () {
        running(id)
        console.log("**\nGPIO'" + output + "' POWER_ON:\ntime:", moment().format("H:mm:ss/D-MM-YYYY"))
        out.writeSync(1)

        var job = schedule.scheduleJob(ending, function () {
            complete(id)
            notify(id,eventType)
            console.log("**\nGPIO'" + output + "' POWER_OFF!\ntime:", moment().format("H:mm:ss/D-MM-YYYY"))
            out.writeSync(0)
        })
    })
}

async function running(id) {
    let sql = "UPDATE sched_event_details SET state = 'running' WHERE uuid =$id"
    $id = id
    await sqlite.run(sql, $id, (err, rows) => {
        if (err) {
            throw err;
        }
    })
}

async function complete(id) {
    let sql = "UPDATE sched_event_details SET state = 'completed' WHERE uuid =$id"
    $id = id
    await sqlite.run(sql, $id, (err, rows) => {
        if (err) {
            throw err;
        }
    })
}

function notify(id, eventType) {
    let message = {
        event: id,
        state: eventType
      };
    client.publish('sf_system/'+hash+'/notifications', JSON.stringify(message),{retain:false, qos:2});
}

// NOT USED
// function aborted(id) {
//     let message = {
//         event: id,
//         state: "aborted"
//     };
//     client.publish('sf_system/'+hash+'/notifications', JSON.stringify(message), { retain: false, qos: 2 });
// }

// try {
//     fs.unlinkSync("./fertevents.db")
// }
// catch(e) {
// }

// mainApp() VERIFICA UTILIZZO