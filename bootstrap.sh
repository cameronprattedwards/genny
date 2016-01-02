sudo DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade -y
sudo apt-add-repository -y ppa:chris-lea/node.js
sudo apt-get update

sudo apt-get install -y libmysqlclient-dev
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
npm config set registry http://registry.npmjs.org/
sudo apt-get install -y build-essential libssl-dev curl git-core
sudo npm install -g --unsafe-perm node-inspector
sudo npm install -g nodemon webpack-dev-server

sudo apt-get install -y mysql-server mysql-client
