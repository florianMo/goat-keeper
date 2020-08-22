#!/bin/bash
echo "Building React app"
npm run build
echo "Removing vhost content"
rm -rf /var/www/html/goat-keeper/*
echo "Updating vhost content"
sudo cp -a ./build/. /var/www/html/goat-keeper/
echo "Reloading Apache"
sudo service apache2 reload