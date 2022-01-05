# Repo Dev - Old SolarFertigation 

> Burn RaspOS Image
- [Download RaspyOS] (https://www.raspberrypi.com/software/operating-systems/)
- [Upload OS in SD Card] (https://www.balena.io/etcher/)

- Upload in SD Card file "ssh" & "wpa_supplicant.conf" to enable SSH Protocol and Wi-Fi Connection
- Install and Follow OS Wizard via HDMI
- Find in your network IP Raspy Address (https://angryip.org)

> SSH Connection
```
ssh <yourhostmane>@<youripaddress>
default hostname: pi | password: raspberry
```

> Install RealVNC Server/Viewer
```
sudo apt-get update
sudo apt-get install realvnc-vnc-server
sudo apt-get install realvnc-vnc-viewer
```

> Install Dataplicity
```
curl -s https://www.dataplicity.com/imu0b7c3.py | sudo python
```

> SSH/VNC Activation
```
sudo raspi-config
```
3 Interface Options --> SSH/VNC ON

> Discover IP via command 
```
hostname -I
```