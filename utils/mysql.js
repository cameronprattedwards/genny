import mysql from 'mysql';

const {MYSQL_URL, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB} = process.env;

let connection = connect();

function connect() {
	const myConnection = mysql.createConnection({
		host: MYSQL_URL,
		user: MYSQL_USER,
		password: MYSQL_PASSWORD,
		database: MYSQL_DB,
	});

	myConnection.connect();

	return myConnection;
}

function reconnect() {
	connection.destroy();
	connection = connect();
}

export default function execMysql(query) {
	return new Promise((resolve, reject) => {
		const {text, values} = query.toParam();
		console.log(text);
		console.log(values);

		try {
			doQuery();
		} catch (e) {
			if (e.message === 'Cannot enqueue Query after fatal error.') {
				reconnect();
				doQuery();
			}
		}

		function doQuery() {
			connection.query(text, values, (error, rows) => {
				if (error) {
					if (error.fatal) {
						reconnect();
					}

					reject(error);
				} else {
					resolve(rows);
				}
			});
		}
	});
}
