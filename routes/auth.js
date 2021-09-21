// Imports
const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For GLobal variables
const mysql = require("mysql2"); // To connect to the database
const auth = require("../middleware/auth"); // Middleware
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

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async(req, res) => {
    const [rows] = await promisePool.query(
        `SELECT user_id, user_name from users WHERE user_id='${req.user_id}'`
    );

    const { user_id, user_name } = rows[0];

    const user = {
        user_id,
        user_name,
    };
    res.json(user);
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
    "/", [
        check("user_name", "name is required").notEmpty(), // Check Username
        check("user_password", "Password is required").exists(), // Check Password
    ],
    async(req, res) => {
        // Check if there are errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract username and password from the body
        const userName = req.body.user_name;
        const password = req.body.user_password;

        const [existence] = await promisePool.query(
            "SELECT EXISTS(SELECT * from users WHERE user_name= ? ) 'EXISTS' FROM dual", [userName]
        );
        const result = existence[0].EXISTS;

        if (!result) {
            // User doesn't exist
            return res.status(400).json({ msg: "Invalid Credentials" });
        } else {
            const [rows] = await promisePool.query(
                `SELECT * from users WHERE user_name='${userName}'`
            );

            //  Extract the id and password from the rows
            const { user_password, user_id } = rows[0];

            // Check the password
            const isMatch = await bcrypt.compare(password, user_password);

            if (!isMatch) {
                // Password doesn't match
                return res.status(400).json({ msg: "Invalid Credentials" });
            } else {
                // Store user_id in payload for token
                const payload = {
                    id: user_id,
                };

                // Create a token
                jwt.sign(
                    payload,
                    config.get("jwtSecret"), {
                        expiresIn: 3600, //seconds
                    },
                    (err, token) => {
                        if (err) throw err;

                        // Send the token to the user
                        res.json({ token });
                    }
                );
            }
        }
    }
);

module.exports = router;