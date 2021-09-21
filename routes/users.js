const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Create a pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "dbmsproject"
});


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) { throw err }
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * from users', (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        })
    })
});

module.exports = router;