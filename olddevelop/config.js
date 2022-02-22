const dotenv = require('dotenv');
dotenv.config();
var md5 = require('md5');
var macaddress = require('macaddress');
var os = require("os");
var hostname = os.hostname();

try {
    var macadd = macaddress.networkInterfaces()["eth0"]["mac"]
    module.exports = {
        //global settings,
        hash: md5(hostname),
        //mqtt configuration,
        kalive: 200,
        user: "alessandro",
        clean: false,
        pass: "solar2021!",
        url: 'mqtt://hairdresser.cloudmqtt.com:15700',
        //gpios configuration,
        zones: [23,24,25],
        ferts: [17,27,22],
        // oldferts: [18,12,16],
        // mix: 18,
        recirc: 13,
        // old_recirc: 20
        water_pump: 23
        // old_water_pump: 21
        // ev: [19,26,12,16,20,21]
        // ava: [04,24,25,06]
    }
    
} catch (error) {
    console.log("errore, di seguito le interfacce disponibili")
    console.log(macaddress.networkInterfaces())
    throw error.message
}
