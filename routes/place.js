const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const error = require('../functions/error');

router.get('/room/:id', (req, res) => {
	//get certain room
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		if (rows.length > 0) {
			const room = rows.map((row) => {
				return {
					id: row.id,
					name: row.title,
					floor: row.flr,
					number: row.num,
					buildId: row.buildingId,
					avail: row.available,
				};
			});
			res.send(room);
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/library/:id', (req, res) => {
	//get certain lib
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM libraries WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		if (rows.length > 0) {
			const library = rows.map((row) => {
				return {
					id: row.id,
					name: row.title,
					floor: row.flr,
					numSeats: row.numSeats,
					buildId: row.buildingId,
				};
			});
			res.send(library);
		} else {
			res.sendStatus(404);
		}
	});
});

router.post('/updateroom/:id', (req, res) => {
	//update certain room
	const connection = getConnection();
	const id = req.params.id;
	const avail = req.body.avail === 1 ? 0 : 1;
	const queryString = 'UPDATE rooms SET available=? WHERE id=?';
	connection.query(queryString, [avail, id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		res.sendStatus(200);
	});
});

router.post('/updatelibrary/:id', (req, res) => {
	//update certain lib
	const connection = getConnection();
	const id = req.params.id;
	const avail = req.body.avail;
	const queryString = 'UPDATE libraries SET numSeats=? WHERE id=?';
	connection.query(queryString, [avail, id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		res.sendStatus(200);
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
