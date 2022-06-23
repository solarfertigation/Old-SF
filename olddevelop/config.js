const dotenv = require('dotenv');
dotenv.config();
var md5 = require('md5');
var macaddress = require('macaddress');

try {
    module.exports = {
        //global settings,
        hash: 'inserire l'hostname del Raspberry in formato MD5',
        //mqtt configuration,
        kalive: 200,
        user: "https://api.cloudmqtt.com/console/82661046/details",
        clean: false,
        pass: "https://api.cloudmqtt.com/console/82661046/details",
        url: 'mqtt://hairdresser.cloudmqtt.com:15700',
        //gpios configuration,
        zones: [23,24,25],
        ferts: [12,16,18],
        recirc: 20,
        water_pump: 21,
    }
    
} catch (error) {
    console.log("errore, di seguito le interfacce disponibili")
    console.log(macaddress.networkInterfaces())
    throw error.message
}
