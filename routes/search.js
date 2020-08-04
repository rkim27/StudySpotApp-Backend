const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
	const connection = getConnection();
	const queryString = 'SELECT * FROM schools';
	connection.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const schools = rows.map((row) => {
			return { id: row.id, name: row.title };
		});
		res.json(schools);
	});
});

router.get('/rooms/:id', (req, res) => {
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE schoolId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const rooms = rows.map((row) => {
			return {
				id: row.id,
				name: row.title,
				floor: row.flr,
				num: row.num,
				buildId: row.buildingId,
			};
		});
		res.send(rooms);
	});
});

router.get('/:id', (req, res) => {
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM schools WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		res.send(rows[0].title);
	});
});

router.get('/libraries/:id', (req, res) => {
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM libraries WHERE schoolId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const libraries = rows.map((row) => {
			return {
				id: row.id,
				name: row.title,
				floor: row.flr,
				buildId: row.buildingId,
			};
		});
		res.send(libraries);
	});
});

router.get('/buildings/:id', (req, res) => {
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM buildings WHERE schoolId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const buildings = rows.map((row) => {
			return {
				id: row.id,
				name: row.title,
			};
		});
		res.send(buildings);
	});
});

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

module.exports = router;
