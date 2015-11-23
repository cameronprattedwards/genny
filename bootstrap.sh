sudo apt-get update
sudo apt-get update
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

sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'
sudo apt-get install -y mysql-server mysql-client
# cd /vagrant/App/Server
# sudo forever start main.js
mysql -u root -p"rootpass" -e "create database genny DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;"

cd /vagrant/migrations
mysql -u root -p"rootpass" < 1.sql

cd /vagrant
rm -rf node_modules
npm install

