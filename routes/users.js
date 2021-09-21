// Imports
const express = require('express');
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For GLobal variables
const mysql = require("mysql"); // To connect with mysql
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


// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [check('user_name', 'name is required').notEmpty(), // Check the username
        check('user_password', 'Please enter a password with 3 or more characters').isLength({ min: 3 }) // Check the password
    ],
    (req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract username and password from the body
        let { user_name, user_password } = req.body;

        // Create connection
        pool.getConnection((err, connection) => {
            if (err) { throw err }

            // Query to check if user exists
            existsQuery = `SELECT EXISTS(SELECT * from users WHERE user_name='${user_name}') "EXISTS" FROM dual`;

            // Executing exist query
            connection.query(existsQuery, async(err, exists) => {
                if (!err) {
                    // Store the result, result is 1 or 0 i.e. boolean
                    const result = exists[0].EXISTS;

                    if (result) {
                        // User already exists
                        return res.status(400).json({ msg: 'User already exists' })
                    } else {
                        // Encrypt Password
                        const salt = await bcrypt.genSalt(10);
                        user_password = await bcrypt.hash(user_password, salt);

                        // Query to add user
                        addQuery = `INSERT INTO users (user_name, user_password) VALUES ('${user_name}', '${user_password}')`;

                        // Executing add query
                        connection.query(addQuery, (err) => {
                            if (!err) {
                                // Creating payload for json web token
                                const payload = {
                                    id: 0
                                }

                                // Query to get the id of user with the given username
                                idQuery = `SELECT user_id from users WHERE user_name='${user_name}'`;

                                // Executing id query
                                connection.query(idQuery, (err, rows) => {
                                    // Releasing connection
                                    connection.release();

                                    if (!err) {
                                        // Storing user id in payload
                                        payload.id = rows[0].user_id;
                                    } else {
                                        console.log(err);
                                    }
                                })

                                // Create a token
                                jwt.sign(payload, config.get("jwtSecret"), {
                                    expiresIn: 3600000
                                }, (err, token) => {
                                    if (err) throw err;

                                    // Send the token to the user
                                    res.json({ token });
                                });

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