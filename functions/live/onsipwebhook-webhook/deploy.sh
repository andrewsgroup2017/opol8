#!/bin/bash
#zip -rq onsipwebhook.zip onsipwebhook.js package.json .env node_modules
#bx wsk action create onsipwebhook --kind nodejs:8 onsipwebhook.zip
bx wsk action update onsip-webhook/webhook --kind nodejs:8 webhook.js
#rm onsipwebhook.zip
bx wsk action invoke --blocking onsip-webhook/webhook