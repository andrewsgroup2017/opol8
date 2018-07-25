#!/bin/bash
zip -rq logcallscloudant.zip logcallscloudant.js crud.js package.json .env node_modules
#bx wsk action create logcallscloudant --kind nodejs:8 logcallscloudant.zip
bx wsk action update onsip-webhook/logcallscloudant --kind nodejs:8 logcallscloudant.zip
rm logcallscloudant.zip
# bx wsk action invoke --blocking onsip-webhook/logcallscloudant