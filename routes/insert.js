const express = require('express');
const mysql = require('mysql');
const router = express.Router();
//all routes here start with /insert
router.post('/', (req, res)=>{ 
    
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'landoftheHigh77',
    database: 'db1'
});

function getConnection(){
    return pool;}

module.exports = router;