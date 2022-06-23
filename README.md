# Repo Dev - Old SolarFertigation 

> Burn RaspOS Image
- [Download RaspyOS] (https://www.raspberrypi.com/software/operating-systems/)
- [Upload OS in SD Card] (https://www.balena.io/etcher/)

- Upload in SD Card file "ssh" & "wpa_supplicant.conf" to enable SSH Protocol and Wi-Fi Connection
- Install and Follow OS Wizard via HDMI
- Find in your network IP Raspy Address (https://angryip.org)

> 1. SSH Connection
```
ssh <yourhostmane>@<youripaddress>
default hostname: pi | password: raspberry
```
> 2. Aggiornamento lista e pacchetti 
```
sudo apt-get update -y && sudo apt-get upgrade -y
```
> 3. Cambiare Hostname e Password
- Entrare in 1.System Options 
```
sudo raspi-config
```
> 4. Install NodeJS
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs
```
- Versione di NodeJS installata
```
node -v
```
> 5. Install GIT
```
sudo apt-get install git -y
```
- Versione di GIT installata
```
git --version
```
> 6. Install Nmap - Discover Raspy IP Address on LAN/WLAN
```
sudo apt update
```
```
sudo apt install -y nmap
```
> 7. Controllo Desktop Remoto: Install RealVNC Server/Viewer
- SSH/VNC Activation
```
sudo raspi-config
```
3 Interface Options --> SSH/VNC ON
```
sudo apt-get update
sudo apt-get install realvnc-vnc-server
sudo apt-get install realvnc-vnc-viewer
```
> 8. Controllo Remoto via SSH: Install Remote.it
```
sudo apt update
```
```
sudo apt install remoteit -y
```
[Device Scanner] - (http://find.remote.it/)


# Install SolarFertigation Code
> Cloning SF Repo
```
git clone https://github.com/solarfertigation/sf-old.git
```
> Install Forever for Always Scripts
```
sudo npm i forever -g
```
> Finish Installation
```
cd oldvevelop/
npm i
```
> Create Dir Forevor Logs
```
mkdir /home/pi/forever_logs
```

# Create SFMachine Heroku Account

> Create New User
- https://solarfertigation-admin.web.app/auth/login
- Username: roule
- Password: password 

- Username: sfmachine#
> Copiare indirizzo MacAddress associato all'IP ed all'interfaccia ETH0/WLAN0
```
ifconfig 
```
- hostame: macaddress raspberry (da controllore formato MD5)
(http://www.md5.cz)


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