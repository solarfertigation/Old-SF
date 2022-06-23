#!/usr/bin/env bash
# stop script on error
set -e

# Check to see if root CA file exists, download if not
if [ ! -f ./root-CA.crt ]; then
  printf "\nDownloading AWS IoT Root CA certificate from AWS...\n"
  curl https://www.amazontrust.com/repository/AmazonRootCA1.pem > root-CA.crt
fi

# install AWS Device SDK for NodeJS if not already installed
if ! node -e "require('aws-iot-device-sdk')" &> /dev/null; then
  printf "\nInstalling AWS SDK...\n"
  npm install aws-iot-device-sdk
fi

# run pub/sub sample app using certificates downloaded in package
printf "\nRunning pub/sub sample application...\n"
node node_modules/aws-iot-device-sdk/examples/device-example.js --host-name=ap8yy7r9eze22-ats.iot.eu-central-1.amazonaws.com --private-key=SolarFertigation-Machine3-Raspy-Cert.private.key --client-certificate=SolarFertigation-Machine3-Raspy-Cert.cert.pem --ca-certificate=root-CA.crt --client-id=sdk-nodejs-b35be2d6-cd6b-40ec-8962-7de349eaea9f
