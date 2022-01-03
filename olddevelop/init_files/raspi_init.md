# Solarfertigation Raspberrypi initializiation

from terminal to sd card into pc inserted:
touch ssh
nano wpa_supplicant.conf
copy from file saved

```
git clone https://solarfertigation.visualstudio.com/Raspi_code/_git/Raspi_code
sudo apt-get update
sudo apt-get dist-upgrade

```
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

```
```
pip install paho-mqtt
pip install xbee
sudo pip install adafruit-mcp3008

```

```
sudo pip install python-dateutil

```
```
npm i

```

```npm i forever -g```
_"g" to install globally_

#xbee usb serial adapter config
download xctu
for mac install https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers
than connect usb serial to usb port

## Usb name for xbee sensor
`udevadm info -a -n /dev/ttyUSB# | grep '{serial}' | head -n1` to find out the serial
Create a new file called `99-usb-serial.rules` in /etc/udev/rules.d and put the following lines in there:
pay attention to idVendor, idProduct, and serial
```
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="XXXXXXX", SYMLINK+="xbee"

```
## Unit file solarfertigation.service

**Important to toggle with forking the type of service**

copy into `/etc/systemd/system`

`sudo chmod 644` to unit file

Now the unit file has been defined we can tell systemd to start it during the boot sequence

```
sudo systemctl daemon-reload

sudo systemctl enable sample.service

mkdir /home/pi/forever_logs
```

Reboot the Pi and your custom service should run:

`sudo reboot`

