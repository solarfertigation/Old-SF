var mqtt = require('mqtt')
var Gpio = require('onoff').Gpio
const { kalive, user, clean, pass, zones, ferts, recirc, url, hash } = require('../config');
var schedule = require('node-schedule')
const moment = require('moment');
var shortid = require('shortid');

var settings = {
  keepalive: kalive,
  clientId: 'zones_processor_'+shortid.generate(),
  username: user,
  clean: clean,  
  password: pass
}

var client  = mqtt.connect(url, settings);

client.on('connect', function () {
 console.log('connected\n');
 client.subscribe('sf_system/'+hash+'/manual_test')
})

client.on('message', function (topic, message) {
  var msg = JSON.parse(message.toString('utf8'))
  console.log("message received: ", msg)

  if (msg.entity === "zone") {
    output = zones[msg.id-1]
    // console.log(output)    
  }
  else if (msg.entity === "fertilizer") {
    output = ferts[msg.id-1]
    // console.log(output)
  }
  else if (msg.entity === "recirculation") {
    output = recirc
    // console.log(output)
  } 
  

  if (msg.command === 1){
    let relay = new Gpio(output, 'out')
    console.log("comando", msg.command)
    relay.writeSync(1)

    endjob = new Date(moment().add(1, 'hour'))
      console.log("emergency relay power off at: ",endjob)
      var job = schedule.scheduleJob("cancel_"+msg.entity+"_"+msg.id, endjob, function () {
        console.log("sto spegnendo per sicurezza il gpio ", msg.entity)
        var message = {
            "id": msg.id,
            "entity": msg.entity,
            "status": 1
        }
        client.publish(topic,JSON.stringify(message))
        relay.writeSync(0)
      })

  }
  
  else if (msg.command === 0) {
    let relay = new Gpio(output, 'out')
    console.log("comando", msg.command)
    relay.writeSync(0)
    var list = schedule.scheduledJobs
    if (list["cancel_"+msg.entity+"_"+msg.id] === undefined || list["cancel_"+msg.entity+"_"+msg.id].length == 0) {
      // array empty or does not exist
    }else {
    list["cancel_"+msg.entity+"_"+msg.id].cancel()
    }
  }

})