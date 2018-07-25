#!/bin/bash
zip -rq onsipwebhook.zip onsipwebhook.js package.json .env node_modules
#bx wsk action create onsipwebhook --kind nodejs:8 onsipwebhook.zip
bx wsk action update onsipwebhook --kind nodejs:8 onsipwebhook.zip
rm onsipwebhook.zip
bx wsk action invoke --blocking onsipwebhook