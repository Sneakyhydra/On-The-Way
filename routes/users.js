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
    database: "student_counselling",
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

// @route   POST api/users/student
// @desc    Register a student
// @access  Public
router.post(
    "/student", [
        check("user_email", "email is required").isEmail(), // Check the email
        check(
            "user_password",
            "Please enter a password with 3 or more characters"
        ).isLength({ min: 3 }), // Check the password
        check("role", "Role is required").notEmpty(), // Check the role
        check("stud_name", "Name is required").notEmpty(), // Check the name
        check("roll_no", "Roll no is required").notEmpty(), // Check the roll no
        check("stud_gender", "Gender is required").notEmpty(), // Check the gender
        check("stud_phone", "Phone is required").notEmpty(), // Check the phone
        check("stud_dept", "Dept is required").notEmpty(), // Check the dept
        check("stud_branch", "Branch is required").notEmpty(), // Check the branch
    ],
    async(req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract info from the body
        let {
            user_email,
            user_password,
            role,
            stud_name,
            roll_no,
            stud_gender,
            stud_phone,
            stud_dept,
            stud_branch,
        } = req.body;

        // Check role
        if (role !== "student") {
            return res.status(400).json({ msg: "Role is not valid" });
        }

        // Check gender
        if (
            stud_gender !== "Male" &&
            stud_gender !== "Female" &&
            stud_gender !== "Other"
        ) {
            return res.status(400).json({ msg: "Gender is not valid" });
        }

        // Check dept
        if (
            stud_dept !== "B.Tech" &&
            stud_dept !== "M.Tech" &&
            stud_dept !== "B.Des" &&
            stud_dept !== "M.Des" &&
            stud_dept !== "P.hd"
        ) {
            return res.status(400).json({ msg: "Programme(dept) is not valid" });
        }

        // Check branch
        if (
            stud_branch !== "CSE" &&
            stud_branch !== "ECE" &&
            stud_branch !== "Des" &&
            stud_branch !== "MECH" &&
            stud_branch !== "NS"
        ) {
            return res.status(400).json({ msg: "Branch is not valid" });
        }

        // Check if user exists
        const [rows] = await promisePool.query(
            `SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" ) "EXISTS" FROM dual`
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
            const [insertUser] = await promisePool.query(
                `INSERT INTO logins (user_email, user_password, role) VALUES ("${user_email}", "${user_password}", "${role}")`
            );

            // Create payload for token
            const payload = {
                id: 0,
            };

            // Get user id
            const [rows] = await promisePool.query(
                `SELECT user_id from logins WHERE user_email='${user_email}'`
            );

            const user_id = rows[0].user_id;
            // Store user id in payload for token
            payload.id = user_id;

            // Add student info
            const [insertStudent] = await promisePool.query(
                `INSERT INTO students (stud_id, stud_name, roll_no, stud_gender, stud_phone, stud_dept, stud_branch) VALUES (${user_id},"${stud_name}", "${roll_no}", "${stud_gender}", "${stud_phone}", "${stud_dept}", "${stud_branch}")`
            );

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

// @route   POST api/users/counsellor
// @desc    Register a counsellor
// @access  Public
router.post(
    "/counsellor", [
        check("user_email", "email is required").isEmail(), // Check the email
        check(
            "user_password",
            "Please enter a password with 3 or more characters"
        ).isLength({ min: 3 }), // Check the password
        check("role", "Role is required").notEmpty(), // Check the role
        check("coun_name", "Name is required").notEmpty(), // Check the name
        check("coun_gender", "Gender is required").notEmpty(), // Check the gender
        check("coun_phone", "Phone is required").notEmpty(), // Check the phone
        check("coun_type", "Type is required").notEmpty(), // Check the type
    ],
    async(req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract info from the body
        let {
            user_email,
            user_password,
            role,
            coun_name,
            coun_gender,
            coun_phone,
            coun_type,
        } = req.body;

        // Check role
        if (role !== "counsellor") {
            return res.status(400).json({ msg: "Role is not valid" });
        }

        // Check gender
        if (
            coun_gender !== "Male" &&
            coun_gender !== "Female" &&
            coun_gender !== "Other"
        ) {
            return res.status(400).json({ msg: "Gender is not valid" });
        }

        // Get all types
        const [typeRows] = await promisePool.query(
            `SELECT category from categories`
        );

        // Check types
        const types = [];
        let found = false;
        for (let i = 0; i < typeRows.length; i++) {
            types[i] = typeRows[i].category;
            if (coun_type === types[i]) {
                found = true;
                break;
            }
        }

        if (!found) {
            return res.status(400).json({ msg: "Counselling type is not valid" });
        }

        // Check if user exists
        const [rows] = await promisePool.query(
            `SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" ) "EXISTS" FROM dual`
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
            const [insertUser] = await promisePool.query(
                `INSERT INTO logins (user_email, user_password, role) VALUES ("${user_email}", "${user_password}", "${role}")`
            );

            // Create payload for token
            const payload = {
                id: 0,
            };

            // Get user id
            const [rows] = await promisePool.query(
                `SELECT user_id from logins WHERE user_email='${user_email}'`
            );

            const user_id = rows[0].user_id;
            // Store user id in payload for token
            payload.id = user_id;

            // Add counsellor info
            const [insertCounsellor] = await promisePool.query(
                `INSERT INTO counsellors (coun_id, coun_name, coun_gender, coun_phone, coun_type) VALUES (${user_id},"${coun_name}", "${coun_gender}", "${coun_phone}", "${coun_type}")`
            );

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

// @route   POST api/users/admin1234
// @desc    Register an admin
// @access  Public, hidden
router.post(
    "/admin1234", [
        check("user_email", "email is required").isEmail(), // Check the email
        check(
            "user_password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }), // Check the password
        check("role", "Role is required").notEmpty(), // Check the role
        check("admin_name", "Name is required").notEmpty(), // Check the name
        check("admin_gender", "Gender is required").notEmpty(), // Check the gender
        check("admin_phone", "Phone is required").notEmpty(), // Check the phone
    ],
    async(req, res) => {
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the errors
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract info from the body
        let {
            user_email,
            user_password,
            role,
            admin_name,
            admin_gender,
            admin_phone,
        } = req.body;

        // Check role
        if (role !== "admin") {
            return res.status(400).json({ msg: "Role is not valid" });
        }

        // Check gender
        if (
            admin_gender !== "Male" &&
            admin_gender !== "Female" &&
            admin_gender !== "Other"
        ) {
            return res.status(400).json({ msg: "Gender is not valid" });
        }

        // Check if user exists
        const [rows] = await promisePool.query(
            `SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" ) "EXISTS" FROM dual`
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
            const [insertUser] = await promisePool.query(
                `INSERT INTO logins (user_email, user_password, role) VALUES ("${user_email}", "${user_password}", "${role}")`
            );

            // Create payload for token
            const payload = {
                id: 0,
            };

            // Get user id
            const [rows] = await promisePool.query(
                `SELECT user_id from logins WHERE user_email='${user_email}'`
            );

            const user_id = rows[0].user_id;
            // Store user id in payload for token
            payload.id = user_id;

            // Add admin info
            const [insertAdmin] = await promisePool.query(
                `INSERT INTO admins (admin_id, admin_name, admin_gender, admin_phone) VALUES (${user_id},"${admin_name}", "${admin_gender}", "${admin_phone}")`
            );

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