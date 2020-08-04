const express = require('express');
const mysql = require('mysql');
const router = express.Router();
//all routes here start with /insert
router.post('/', (req, res) => {
	//handle school table post
	const id = req.body.id; //id either null if new entry or id of entry to update
	const name = req.body.school;
	const update = req.body.update; //boolean if updating or new entry
	const connection = getConnection();
	const queryString = update
		? `UPDATE schools SET title=? WHERE id=${id}`
		: 'INSERT INTO schools (title) VALUES(?)';
	connection.query(queryString, [name], (err, rows, fields) => {
		if (err) {
			console.log('Failed to insert: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const resId = update ? id : rows.insertId; //respond back with new id or current ids
		console.log('Inserted school with ID ', resId);
		res.json({ id: resId });
	});
});

router.post('/building', (req, res) => {
	const id = req.body.id;
	const name = req.body.building;
	const schoolId = req.body.schoolId;
	const update = req.body.update; //boolean if updating or new entry
	const connection = getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE buildings SET title=? WHERE id=${id}`
		: 'INSERT INTO buildings (title, schoolId) VALUES(?, ?)';
	connection.query(queryString, [name, schoolId], (err, rows, fields) => {
		if (err) {
			console.log('Failed to insert: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		const resId = update ? id : rows.insertId; //respond back with new id or current id
		console.log('Inserted building with ID ', resId);
		res.json({ id: resId });
	});
});

router.post('/building/room', (req, res) => {
	const id = req.body.id;
	const name = req.body.room;
	const floor = req.body.floor;
	const num = req.body.num;
	const update = req.body.update; //boolean if updating or new entry
	const buildId = req.body.buildId;
	const schoolId = req.body.schoolId;
	const connection = getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE rooms SET title=?, flr=?, num=? WHERE id=${id}`
		: 'INSERT INTO rooms (title, flr, num, buildingId, schoolId) VALUES(?, ?, ?, ?, ?)';
	connection.query(
		queryString,
		[name, floor, num, buildId, schoolId],
		(err, rows, fields) => {
			if (err) {
				console.log('Failed to insert: ' + err); //if query error
				res.sendStatus(500);
				return;
			}
			const resId = update ? id : rows.insertId; //respond back with new id or current id
			console.log('Inserted room with ID ', resId);
			res.json({ id: resId });
		}
	);
});

router.post('/building/library', (req, res) => {
	const id = req.body.id;
	const name = req.body.library;
	const floor = req.body.floor;
	const update = req.body.update; //boolean if updating or new entry
	const buildId = req.body.buildId;
	const schoolId = req.body.schoolId;
	const connection = getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE libraries SET title=?, flr=? WHERE id=${id}`
		: 'INSERT INTO libraries (title, flr,  buildingId, schoolId) VALUES(?, ?, ?, ?)';
	connection.query(
		queryString,
		[name, floor, buildId, schoolId],
		(err, rows, fields) => {
			if (err) {
				console.log('Failed to insert: ' + err); //if query error
				res.sendStatus(500);
				return;
			}
			const resId = update ? id : rows.insertId; //respond back with new id or current id
			console.log('Inserted library with ID ', resId);
			res.json({ id: resId });
		}
	);
});

router.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	const table = req.body.tab;
	const connection = getConnection();
	const queryString = `DELETE FROM ${table} WHERE id=?`;
	connection.query(queryString, [id], (err, rows, fields) => {
		if (err) {
			console.log('Failed to delete: ' + err); //if query error
			res.sendStatus(500);
			return;
		}
		res.send('Deleted');
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
