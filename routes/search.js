const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/', (req, res) => {
	//get all schools
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

router.get('/building/rooms/:id', (req, res) => {
	//get all rooms for a building
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE buildingId=?';
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

router.get('/building/libraries/:id', (req, res) => {
	//get all lib from school
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM libraries WHERE buildingId=?';
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

router.get('/rooms/:id', (req, res) => {
	//get all rooms from school
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
	//get certain school
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM schools WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		if (rows.length > 0) {
			res.send(rows[0].title);
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/libraries/:id', (req, res) => {
	//get all lib from school
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
	//get all build from school
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

router.get('/room/:id', (req, res) => {
	//get certain rooms
	const connection = getConnection();
	const id = req.params.id;
	const queryString = 'SELECT * FROM rooms WHERE id=?';
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
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
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
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
	//combine with below function
	const connection = getConnection();
	const id = req.params.id;
	const avail = req.body.avail === 1 ? 0 : 1;
	const queryString = 'UPDATE rooms SET available=? WHERE id=?';
	connection.query(queryString, [avail, id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
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
		if (err) {
			console.log('Failed to get: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
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
