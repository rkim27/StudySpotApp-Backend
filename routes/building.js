const express = require('express');
const pool = require('../functions/pool');
const router = express.Router();
const error = require('../functions/error');

router.get('/rooms/:id', (req, res) => {
	//get all rooms for a building
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE buildingId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
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

router.get('/libraries/:id', (req, res) => {
	//get all lib for a building
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM libraries WHERE buildingId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
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

module.exports = router;
