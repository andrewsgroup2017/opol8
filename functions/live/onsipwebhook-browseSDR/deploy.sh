#!/bin/bash
zip -rq browseSDR.zip browseSDR.js package.json node_modules
#bx wsk action create onsip-webhook/browseSDR --kind nodejs:8 browseSDR.zip
bx wsk action update onsip-webhook/browseSDR --kind nodejs:8 browseSDR.zip
rm browseSDR.zip
# bx wsk action invoke --blocking onsip-webhook/browseSDR