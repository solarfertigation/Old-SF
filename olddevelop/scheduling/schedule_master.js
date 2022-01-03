var scheduler = require("./schedule_slave")
var shortid = require('shortid');
var mqtt = require('mqtt');
var shortid = require('shortid');
const { kalive, user, clean, pass, url, hash } = require('../config');

var settings = {
    keepalive: kalive,
    clientId: 'sched_mast_'+shortid.generate(),
    username: user,
    clean: clean,  
    qos: 2,
    password: pass
  }
  
  var client  = mqtt.connect(url, settings);
  
  client.on('connect', function () {
   console.log('connect');
   client.subscribe('sf_system/'+hash+'/event')
   console.log('connected to messages')
  })

client.on('message', async function (topic, message) {
        var msg = JSON.parse(message.toString('utf8'));
        console.log("message received\n", msg)
        if(msg.type === "add"){
            console.log(msg.type)
        await scheduler.insert_received(topic, msg)
        scheduler.schedall()
        }else if(msg.type === "delete"){
            console.log(msg.type)
            await scheduler.deletion(msg)
            scheduler.schedall()
        }else if(msg.type === "modify"){
            console.log(msg.type)
            await scheduler.modify(msg)
            scheduler.schedall()
        }
    })

scheduler.firstopen()