# Repo Dev - Old SolarFertigation 

> Burn RaspOS Image
- [Download RaspyOS] (https://www.raspberrypi.com/software/operating-systems/)
- [Upload OS in SD Card] (https://www.balena.io/etcher/)

- Upload in SD Card file SSH & wpa_supplicant.conf
- Find in your network IP Raspy Address (https://angryip.org)

> SSH Connection
```
ssh pi@192.168.1.2
password: raspberry
```
> Install RealVNC Server/Viewer
```
sudo apt-get update
sudo apt-get install realvnc-vnc-server
sudo apt-get install realvnc-vnc-viewer
```
> SSH/VNC Activation
```
sudo raspi-config
```
> Discover IP via command 
```
hostname -I
```
