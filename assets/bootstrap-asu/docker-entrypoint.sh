#!/bin/sh
set -ex


# Prep test environment
echo "#############################"
echo "#                           #"
echo "# PREPPING TEST ENVIRONMENT #"
echo "#                           #"
echo "#############################"

cd /app
pwd

yarn global add grunt-cli

gem install sass
gem update --system
gem install scss_lint

yarn install


echo "############################"
echo "#                          #"
echo "#   BEGIN REQUESTED TEST   #"
echo "#                          #"
echo "############################"

exec "$@"
