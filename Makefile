mysql_ssh:
	source ./env && mysql -u `printenv MYSQL_USER` -h `printenv MYSQL_URL` -p"`printenv MYSQL_PASSWORD`" `printenv MYSQL_DB`
