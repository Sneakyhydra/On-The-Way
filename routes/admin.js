// Imports
const express = require("express");
const mysql = require("mysql2"); // To connect to the DB
const auth = require("../middleware/auth"); // Middleware

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

// @route   GET api/admin/pending
// @desc    Get pending counsellors
// @access  Private
router.get("/pending", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { role } = rows[0];

    if (role === "admin") {
        // Get admin details from the DB
        const [rows] = await promisePool.query(
            `SELECT * from counsellors WHERE coun_status="Pending"`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

// @route   PUT api/admin/pending
// @desc    APPROVE or REJECT a counsellor
// @access  Private
router.put("/pending", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { role } = rows[0];

    if (role === "admin") {
        const [rows] = await promisePool.query(
            `UPDATE counsellors SET coun_status='${req.body.type}' WHERE coun_id=${req.body.id}`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

module.exports = router;