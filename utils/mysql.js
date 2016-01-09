import mysql from 'mysql';

const {MYSQL_URL, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB} = process.env;

const pool = mysql.createPool({
	host: MYSQL_URL,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DB,
	connectionLimit: 10,
});

export default function execMysql(query) {
	return new Promise((resolve, reject) => {
		const {text, values} = query.toParam();
		console.log(text);
		console.log(values);

		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
				return;
			}

			connection.query(text, values, (error, rows) => {
				if (error) {
					if (error.fatal) {
						connection.destroy();
					}

					reject(error);
				} else {
					resolve(rows);
				}
				connection.release();
			});
		});
	});
}
