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

> Install Remote.it
```
sudo apt update
```
```
sudo apt install remoteit -y
```
[Device Scanner] - (http://find.remote.it/)


> Install Nmap - Discover Raspy IP Address on LAN/WLAN
```
sudo apt update
```
```
sudo apt install -y nmap
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

In caso di problemi nella connessione SSH
> SSH Re-Build Key
```
ssh-keygen -R "hostname/ip"
```

> Creazione nuovi utenti Raspberry
```
sudo adduser <nomeutente>
```
> Cancellazione utenti Raspberry
```
sudo userdel-r <nomeutente>
```
> Copiare una dir da un percorso ad un altro 
```
sudo cp -r pathorigin pathdestination 
```
> Creare una dir 
```
sudo mkdir <nomecartella>
```
> Cancellare una dir 
```
sudo rm -rf  pathorigin pathdestination 
```
> Creare nuovo file  
```
sudo touch <nomefile>
```
> Rinominare dir e file
```
sudo mv  pathorigin/nomefile pathdestination/nomefile
```