#!/bin/bash
source /root/.nvm/nvm.sh #this loads nvm's environment vars

echo "Running data-processor batch script"
export PATH=/usr/local/bin:$PATH

cd /var/www/sporkhub

echo --------------------------------------------------------------------------------------------------
echo 
NODE_ENV=production node /var/www/sporkhub/server/data-processor/fetchIssuesRepos.js
NODE_ENV=production node /var/www/sporkhub/server/data-processor/refreshRepos.js
echo
echo --------------------------------------------------------------------------------------------------