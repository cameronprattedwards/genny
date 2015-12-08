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

export default function execMysql(query) {
	return new Promise((resolve, reject) => {
		const {text, values} = query.toParam();
		console.log(text);
		console.log(values);
		connection.query(text, values, (error, rows) => {
			if (error) {
				reject(error);

				if (error.fatal) {
					connection.destroy();
					connection = connect();
				}
			} else {
				resolve(rows);
			}
		});
	});
}
