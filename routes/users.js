// Imports
const express = require("express");
const mysql = require("mysql2"); // To connect with database
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For global variables
const { check, validationResult } = require("express-validator"); // To check and validate the inputs

// Init router
const router = express.Router();

// Create the pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbmsproject",
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    "/", [
        check("user_name", "name is required").notEmpty(), // Check the username
        check(
            "user_password",
            "Please enter a password with 3 or more characters"
        ).isLength({ min: 3 }), // Check the password
    ],
    async(req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract user_name and user_password from the body
        let { user_name, user_password } = req.body;

        // Check if user exists
        const [rows] = await promisePool.query(
            "SELECT EXISTS(SELECT * from users WHERE user_name= ? ) 'EXISTS' FROM dual", [user_name]
        );
        const result = rows[0].EXISTS;

        if (result) {
            // User already exists
            return res.status(400).json({ msg: "User already exists" });
        } else {
            // Encrypt Password
            const salt = await bcrypt.genSalt(10);
            user_password = await bcrypt.hash(user_password, salt);

            // Add user to the database
            const [inserting] = await promisePool.query(
                `INSERT INTO users (user_name, user_password) VALUES ("${user_name}", "${user_password}")`
            );

            // Create payload for token
            const payload = {
                id: 0,
            };

            // Get user id
            const [rows] = await promisePool.query(
                `SELECT user_id from users WHERE user_name='${user_name}'`
            );

            // Store user id in payload for token
            payload.id = rows[0].user_id;

            // Create token
            jwt.sign(
                payload,
                config.get("jwtSecret"), {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) throw err;

                    // Send the token to the user
                    res.json({ token });
                }
            );
        }
    }
);

module.exports = router;