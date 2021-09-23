// Imports
const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For global variables
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
    database: "student_counselling",
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_id and user_name from database
    const [rows] = await promisePool.query(
        `SELECT user_email, role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_id and user_name from rows
    const { user_email, role } = rows[0];

    // Create user object
    let user = {
        user_id,
        user_email,
        role,
    };

    if (role === "counsellor") {
        const [rows] = await promisePool.query(
            `SELECT coun_name, coun_gender, coun_phone, coun_type from counsellors WHERE coun_id='${user_id}'`
        );

        const { coun_name, coun_gender, coun_phone, coun_type } = rows[0];

        user = {
            ...user,
            coun_name,
            coun_gender,
            coun_phone,
            coun_type,
        };
    } else if (role === "student") {
        const [rows] = await promisePool.query(
            `SELECT stud_name, roll_no, stud_gender, stud_phone, stud_dept, stud_branch from students WHERE stud_id='${user_id}'`
        );

        const {
            stud_name,
            roll_no,
            stud_gender,
            stud_phone,
            stud_dept,
            stud_branch,
        } = rows[0];

        user = {
            ...user,
            stud_name,
            roll_no,
            stud_gender,
            stud_phone,
            stud_dept,
            stud_branch,
        };
    } else if (role === "admin") {
        const [rows] = await promisePool.query(
            `SELECT admin_name, admin_gender, admin_phone from admins WHERE admin_id='${user_id}'`
        );

        const {
            admin_name,
            admin_gender,
            admin_phone
        } = rows[0];

        user = {
            ...user,
            admin_name,
            admin_gender,
            admin_phone
        };
    }

    // Send user object to the client
    res.json(user);
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
    "/", [
        check("user_email", "email is required").notEmpty(), // Check email
        check("user_password", "Password is required").exists(), // Check password
    ],
    async(req, res) => {
        // Check if there are errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract username and password from the body
        const userEmail = req.body.user_email;
        const password = req.body.user_password;

        // Check if the user exists
        const [existence] = await promisePool.query(
            `SELECT EXISTS(SELECT * from logins WHERE user_email= "${userEmail}" ) 'EXISTS' FROM dual`
        );
        const result = existence[0].EXISTS;

        if (!result) {
            // User doesn't exist
            return res.status(400).json({ msg: "Invalid Credentials" });
        } else {
            // Get user details from database
            const [rows] = await promisePool.query(
                `SELECT * from logins WHERE user_email='${userEmail}'`
            );

            //  Extract the id and password from the rows
            const { user_password, user_id, user_email } = rows[0];

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

                        // Send token to the client
                        res.json({ token });
                    }
                );
            }
        }
    }
);

module.exports = router;