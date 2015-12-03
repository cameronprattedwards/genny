mysql_ssh:
	source ./env && mysql -u `printenv MYSQL_USER` -h `printenv MYSQL_URL` -p"`printenv MYSQL_PASSWORD`" `printenv MYSQL_DB`

share:
	source ./env && vagrant share --name ${VAGRANT_SHARE_NAME} --http ${WEBHOOK_PORT}

vagrant_dev:
	vagrant ssh -c "cd /vagrant && npm run dev"

vagrant_hooks:
	vagrant ssh -c "cd /vagrant && npm run hooks"

vagrant_webpack:
	vagrant ssh -c "cd /vagrant && npm run webpack"
