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
cd sf-old
npm i
```
> Create Dir Forevor Logs
```
mkdir /home/pi/forever_logs
```

# Add SolarFertigation Service on Boot 
> Copy Service
```
cd init_files
sudo cp solarfertigation.service /etc/systemd/system/
```
> Add CHMOD Privilages
```
cd /etc/systemd/system/
sudo chmod 644 solarfertigation.service
```
> Reload Deamon & Enable/Start/Status Service
```
sudo systemctl daemon-reload
sudo systemctl enable solarfertigation.service
sudo systemctl start solarfertigation.service
sudo systemctl status solarfertigation.service
```

# Aggiornare file config.js
```
cd home/pi/sf-old/olddevelop
sudo nano config.js
```
```
hash: 'raspberry macaddress in formato MD5' (http://www.md5.cz)
user: "user mqtt (https://api.cloudmqtt.com/console/82661046/details)"
pass: "password mqtt (https://api.cloudmqtt.com/console/82661046/details)" 
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