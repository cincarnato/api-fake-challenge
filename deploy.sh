#!/bin/sh
echo "DEPLOY: START"
nvm use 20

echo "DEPLOY: git checkout and pull"
git checkout .
git pull origin master

echo "DEPLOY: Build install dependencies"

npm install

nvm use 20
echo "DEPLOY: Start PM2"
pm2 stop stop ecosystem.config.cjs
pm2 start ecosystem.config.cjs --update-env

echo "DEPLOY: END"
