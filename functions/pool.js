const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'secret',
	database: 'appdb',
});

function getConnection() {
	return pool;
}

exports.getConnection = getConnection;
