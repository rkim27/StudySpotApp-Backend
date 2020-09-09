const express = require('express');
const pool = require('../functions/pool');
const error = require('../functions/error');
const router = express.Router();

//all routes here start with /insert
router.post('/', (req, res) => {
	//handle school table post
	const id = req.body.id; //id either null if new entry or id of entry to update
	const name = req.body.school;
	const update = req.body.update; //boolean if updating or new entry
	const connection = pool.getConnection();
	const queryString = update
		? `UPDATE schools SET title=? WHERE id=?`
		: 'INSERT INTO schools (title) VALUES(?)';
	connection.query(queryString, [name, id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
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
	const connection = pool.getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE buildings SET title=? WHERE id=?`
		: 'INSERT INTO buildings (title, schoolId) VALUES(?, ?)';
	const values = update ? [name, id] : [name, schoolId];
	connection.query(queryString, values, (err, rows, fields) => {
		if (error.catchError(err, res)) return;
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
	const connection = pool.getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE rooms SET title=?, flr=?, num=? WHERE id=?`
		: 'INSERT INTO rooms (title, flr, num, buildingId, schoolId) VALUES(?, ?, ?, ?, ?)';
	const values = update
		? [name, floor, num, id]
		: [name, floor, num, buildId, schoolId];
	connection.query(queryString, values, (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		const resId = update ? id : rows.insertId; //respond back with new id or current id
		console.log('Inserted room with ID ', resId);
		res.json({ id: resId });
	});
});

router.post('/building/library', (req, res) => {
	const id = req.body.id;
	const name = req.body.library;
	const floor = req.body.floor;
	const update = req.body.update; //boolean if updating or new entry
	const buildId = req.body.buildId;
	const schoolId = req.body.schoolId;
	const connection = pool.getConnection();
	//init buildings name and id, upon update only change title
	const queryString = update
		? `UPDATE libraries SET title=?, flr=? WHERE id=?`
		: 'INSERT INTO libraries (title, flr,  buildingId, schoolId) VALUES(?, ?, ?, ?)';
	const values = update ? [name, floor, id] : [name, floor, buildId, schoolId];
	connection.query(queryString, values, (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		const resId = update ? id : rows.insertId; //respond back with new id or current id
		console.log('Inserted library with ID ', resId);
		res.json({ id: resId });
	});
});

router.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	const table = req.body.tab;
	const connection = pool.getConnection();
	//user cant specifically change table value, handled internally
	const queryString = `DELETE FROM ${table} WHERE id=?`;
	connection.query(queryString, [id], (err, rows, fields) => {
		if (error.catchError(err, res)) return;
		res.send('Deleted');
	});
});

module.exports = router;
