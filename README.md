# SolarFertigation RaspberryPi initializiation guide

L'inizializzazione di una nuova macchina SF parte dalla configurazione del Raspberry pi con sistema operativo Raspberry OS in versione lite

1. flashare il sistema operativo mediante il tool [Raspberry pi imager](https://www.raspberrypi.com/software/) (consigliato) 
2. collegarsi al dispositivo (connesso alla rete) con protocollo ssh oppure collegarlo ad un monitor + tastiera e mouse per l'accesso diretto
3. il seguente comando consente l'accesso alle impostazioni di base del dispositivo

```
sudo raspi-config
```

da qui è possibile assegnare un nuovo hostname al dispositivo. L'hostname è richiamato automaticamente nel config.js e utilizzato come parte del topic MQTT di riferimento per ogni dispositivo.
Fatto questo, riavviare il dispositivo.

```
sudo reboot

```
Effettuate le operazioni di cui sopra, segue una lista di comandi che portano alla completa configurazione di un device Solarfertigation. Se effettuata correttamente, la configurazione dà luogo a un dispositivo pronto all'uso. 
Ciascuna riga è seguita da un rapido commento che ne descrive la funzione.



```
sudo apt-get update -y && sudo apt-get upgrade -y
```
aggiornamento sistema e repository
```
sudo apt-get install git -y
```
installazione di git
```
git clone https://github.com/G14nLu/newnewsfirmware.git
```
cloning del repository SolarFertigation
```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs
```
installazione di node js. in caso di fallimento del comando npm esegure il comando di seguito
```
sudo apt-get -f install npm
```
```
sudo npm i forever -g
```
installazione di forever: la piattaforma di gestione "always on" degli script SF
```
cd newnewsfirmware/
```
```
npm i
```
installazione dei restanti packages
```
cd init_files
```
configurazione del servizio di sistema che renda attivo ad ogni riavvio il framework SF

```
sudo cp solarfertigation.service /etc/systemd/system/

cd /etc/systemd/system/

sudo chmod 644 solarfertigation.service

sudo systemctl daemon-reload

sudo systemctl enable solarfertigation.service

mkdir /home/pi/forever_logs

sudo raspi-config per cambio hostname
```
## Operazioni aggiuntive

- per il controllo remoto dei dispositivi può essere utilizzato il tool "dataplicity". Le istruzioni per l'installazione del client Windows/Mac e del demone sul raspberry sono presenti sul sito ufficiale
    - install [dataplicity](www.dataplicity.com) 
- La connettività è, in gerere, configurata tramite internet key no brand su base chip huawei.
    - collegare la chiavetta huawei da pc e impostare APN “em”
    - abilita roaming dati
    - link utile [https://consumer-tkb.huawei.com/tkbapp/downloadWebsiteService?websiteId=1697201](https://consumer-tkb.huawei.com/tkbapp/downloadWebsiteService?websiteId=1697201)
    - disabilitare la verifica pin sempre riavviando la chiavetta che apre automaticamente il browser
- In alternativa sono state recentemente acquistate delle internet key compatibili a marchio TIM di ben più semplice installazione e configurazione che confermano la compatibilità plug and play con Raspberry pi. Di seguito il link del prodotto. La configurazione di APN e roaming rimane la medesima
    - [https://www.amazon.it/gp/product/B01NCQUJZU/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1](https://www.amazon.it/gp/product/B01NCQUJZU/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)


### Creazione nuovi utenti
 https://solarfertigation-admin.web.app/admin/user-page/
 
 user: roule
 
 pass: password
