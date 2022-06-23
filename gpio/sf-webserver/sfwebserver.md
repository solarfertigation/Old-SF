# Add SF WebServer Service on Boot 

> Copy Service on dir System
```
cd gpio/sf-webserver
sudo cp sfwebserver.service /etc/systemd/system/
```
> Add CHMOD Privilages
```
cd /etc/systemd/system/
sudo chmod 777 sfwebserver.service
```
> Reload Deamon & Enable/Start/Status Service
```
sudo systemctl daemon-reload
sudo systemctl enable sfwebserver.service
sudo systemctl start sfwebserver.service
sudo systemctl status sfwebserver.service