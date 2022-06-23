# Add AWS Service on Boot 

> Test script.sh
```
cd aws-iot/sfmachine#
sudo chmod +x start.sh
sudo ./start.sh
```
> Copy Service on dir System
```
cd aws-iot/serviceboot
sudo cp awsservice.service /etc/systemd/system/
```
> Add CHMOD Privilages
```
cd /etc/systemd/system/
sudo chmod 777 awsservice.service
```
> Reload Deamon & Enable/Start/Status Service
```
sudo systemctl daemon-reload
sudo systemctl enable awsservice.service
sudo systemctl start awsservice.service
sudo systemctl status awsservice.service
```