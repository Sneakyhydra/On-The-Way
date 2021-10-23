// Imports
const express = require("express");
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For global variables
const mysql = require("mysql2"); // To connect to the DB
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

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT user_email, role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { user_email, role } = rows[0];

    // Create user object
    let user = {
        user_id,
        user_email,
        role,
    };

    // Check the role
    if (role === "counsellor") {
        // Get counsellor details from the DB
        const [rows] = await promisePool.query(
            `SELECT coun_name, coun_gender, coun_phone, coun_dept, coun_status from counsellors WHERE coun_id='${user_id}'`
        );

        // Extract the details in variables
        const { coun_name, coun_gender, coun_phone, coun_dept, coun_status } = rows[0];

        // Store the details in the user object
        user = {
            ...user,
            coun_name,
            coun_gender,
            coun_phone,
            coun_dept,
            coun_status
        };
    } else if (role === "student") {
        // Get student details from the DB
        const [rows] = await promisePool.query(
            `SELECT stud_name, roll_no, stud_gender, stud_phone, stud_dept, stud_branch from students WHERE stud_id='${user_id}'`
        );

        // Extract the details in variables
        const {
            stud_name,
            roll_no,
            stud_gender,
            stud_phone,
            stud_dept,
            stud_branch,
        } = rows[0];

        // Store the details in the user object
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
        // Get admin details from the DB
        const [rows] = await promisePool.query(
            `SELECT admin_name, admin_gender, admin_phone from admins WHERE admin_id='${user_id}'`
        );

        // Extract the details in variables
        const {
            admin_name,
            admin_gender,
            admin_phone
        } = rows[0];

        // Store the details in the user object
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

        // Extract userEmail and password from the body
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
            // Get user details from DB
            const [rows] = await promisePool.query(
                `SELECT * from logins WHERE user_email='${userEmail}'`
            );

            //  Extract the user_id and user_password from the rows
            const { user_id, user_password } = rows[0];

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