#Raspberry receiver

Clone the repository
```
git clone https://solarfertigation.visualstudio.com/_git/receiver_code
```

## Prerequisites

- install npm
- install python 2.7

### npm packages

`npm i` to install packages from package.json
https://www.npmjs.com/package/rpi-dht-sensor
### Python packages

- Adafruit_GPIO.SPI
- Adafruit_MCP3008
- paho.mqtt.client
- [xbee](https://pypi.python.org/pypi/XBee)


### Installing

```
npm i
```


```
git clone https://github.com/adafruit/Adafruit_Python_GPIO.git
cd Adafruit_Python_GPIO
python setup.py install
```


```
sudo apt-get install git build-essential python-dev
cd ~
git clone https://github.com/adafruit/Adafruit_Python_MCP3008.git
cd Adafruit_Python_MCP3008
sudo python setup.py install
```

## Authors

**Gianluca Valecce**

