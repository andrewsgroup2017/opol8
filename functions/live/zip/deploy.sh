#!/bin/bash
zip -rq onsipwebhook.zip onsipwebhook.js package.json .env node_modules
bx wsk action create onsip/onsipwebhook --kind nodejs:8 onsipwebhook.zip
#bx wsk action update onsip/onsipwebhook --kind nodejs:8 onsipwebhook.zip
rm aws2cloudant.zip
bx wsk action invoke --blocking onsip/onsipwebhook