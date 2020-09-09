const express = require('express');
const pool = require('../functions/pool');
const router = express.Router();
const error = require('../functions/error');

router.get('/', (req, res) => {
	//get all schools
	const connection = pool.getConnection();
	const queryString = 'SELECT * FROM schools';
	connection.query(queryString, (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		const schools = rows.map((row) => {
			return { id: row.id, name: row.title };
		});
		res.json(schools);
	});
});

router.get('/rooms/:id', (req, res) => {
	//get all rooms from school
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE schoolId=?';
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

router.get('/:id', (req, res) => {
	//get certain school
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM schools WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		if (rows.length > 0) {
			res.send(rows[0].title);
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/libraries/:id', (req, res) => {
	//get all lib from school
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM libraries WHERE schoolId=?';
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

router.get('/buildings/:id', (req, res) => {
	//get all build from school
	const connection = pool.getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM buildings WHERE schoolId=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		const buildings = rows.map((row) => {
			return {
				id: row.id,
				name: row.title,
			};
		});
		res.send(buildings);
	});
});

module.exports = router;
