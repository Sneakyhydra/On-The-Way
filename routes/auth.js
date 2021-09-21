// Imports
const express = require('express');
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For GLobal variables
const mysql = require("mysql"); // To connect with mysql
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // To check and validate the inputs

// Init router
const router = express.Router();

// Create a pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "dbmsproject"
});

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async(req, res) => {
    // Create Connection
    pool.getConnection((err, connection) => {
        if (err) throw err;

        // Query to get the user name of the user with the id
        userQuery = `SELECT user_id, user_name from users WHERE user_id='${req.user_id}'`;

        // Executing the user query
        connection.query(userQuery, async(err, rows) => {
            // Releasing the connection
            connection.release();

            // Error checking
            if (!err) {
                //  Extract the id and name from the row
                const { user_id, user_name } = rows[0];

                // Return a object
                const user = {
                    user_id,
                    user_name
                }
                res.json(user);
            } else {
                // Return an error
                console.log(err);
                res.status(500).send("Server Error");
            }
        })
    });
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', [check('user_name', 'name is required').notEmpty(), // Check Username
    check('user_password', 'Password is required').exists() // Check Password
], (req, res) => {
    // Check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return the errors
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract username and password from the body
    const userName = req.body.user_name;
    const password = req.body.user_password;

    // Create connection
    pool.getConnection((err, connection) => {
        if (err) throw err;

        // Query to check whether the username exists in the database
        existsQuery = `SELECT EXISTS(SELECT * from users WHERE user_name='${userName}') "EXISTS" FROM dual`;

        // Executing the exist query
        connection.query(existsQuery, (err, exists) => {
            if (!err) {
                // Store the result, result is 1 or 0 i.e. boolean
                const result = exists[0].EXISTS;

                if (!result) {
                    // User doesn't exist
                    return res.status(400).json({ msg: "Invalid Credentials" });
                } else {
                    // Query to get all user details with the given username
                    userQuery = `SELECT * from users WHERE user_name='${userName}'`;

                    // Executing the user query
                    connection.query(userQuery, async(err, rows) => {
                        // Release the connection
                        connection.release();
                        if (!err) {
                            // Extract the id and password from the rows
                            const { user_password, user_id } = rows[0];

                            // Check the password
                            const isMatch = await bcrypt.compare(password, user_password);

                            if (!isMatch) {
                                // Password doesn't match
                                return res.status(400).json({ msg: "Invalid Credentials" });
                            } else {
                                // Store user_id in payload for token
                                const payload = {
                                    id: user_id
                                }

                                // Create a token
                                jwt.sign(payload, config.get("jwtSecret"), {
                                    expiresIn: 3600000 //seconds
                                }, (err, token) => {
                                    if (err) throw err;

                                    // Send the token to the user
                                    res.json({ token });
                                });
                            }
                        } else {
                            console.log(err);
                        }
                    })
                }
            } else {
                console.log(err);
            }
        })
    })

});

module.exports = router;