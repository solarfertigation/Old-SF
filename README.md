# Raspberry Machine Preparation

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
