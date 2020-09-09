const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'landoftheHigh77',
	database: 'appdb',
});

function getConnection() {
	return pool;
}

exports.getConnection = getConnection;
