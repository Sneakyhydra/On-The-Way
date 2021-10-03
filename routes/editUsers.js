// Imports
const express = require("express");
const mysql = require("mysql2"); // To connect with DB
const bcrypt = require("bcryptjs"); // For hashing password
const jwt = require("jsonwebtoken"); // For authorization
const config = require("config"); // For global variables
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

// @route   PUT api/editUsers/admin1234
// @desc    Edit admin
// @access  Private
router.put(
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
        check("admin_id", "ID is required").notEmpty(), // Check the phone
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
            admin_id
        } = req.body;

        const user = {
            user_email,
            user_password,
            role,
            admin_name,
            admin_gender,
            admin_phone
        }

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

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);
        user_password = await bcrypt.hash(user_password, salt);

        try {
            const [update] = await promisePool.query(
                `UPDATE logins SET user_email='${user_email}', user_password='${user_password}' WHERE user_id=${admin_id}`
            );

            const [update2] = await promisePool.query(
                `UPDATE admins SET admin_name='${admin_name}', admin_gender='${admin_gender}', admin_phone='${admin_phone}' WHERE admin_id=${admin_id}`
            );
        } catch (err) {
            throw err;
        }

        res.send(user);
    }
);

module.exports = router;