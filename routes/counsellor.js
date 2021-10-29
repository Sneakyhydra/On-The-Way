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


// @route   GET api/admin/quesans
// @desc    Get all questions and answers
// @access  Private
router.get("/quesans", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { role } = rows[0];

    if (role === "counsellor") {
        // Get admin details from the DB
        const [ques] = await promisePool.query(
            `SELECT * from questions`
        );

        const [ans] = await promisePool.query(
            `SELECT * from answers`
        );

        let quesAns = [];
        let quesItem = {
            ques_id: null,
            ques_desc: null,
            ques_no: null,
            answers: []
        }
        let ansItem = {
            ans_id: null,
            ans_no: null,
            ans_desc: null,
            response: null
        }

        for (let i = 0; i < ques.length; i++) {
            quesItem = {
                ques_id: ques[i].ques_id,
                ques_desc: ques[i].ques_desc,
                ques_no: ques[i].ques_no,
                answers: []
            }

            for (let j = 0; j < ans.length; j++) {
                if (ans[j].ques_id === ques[i].ques_id) {
                    ansItem = {
                        ans_id: ans[j].ans_id,
                        ans_no: ans[j].ans_no,
                        ans_desc: ans[j].ans_desc,
                        response: ans[j].response,
                    }

                    quesItem.answers.push(ansItem)
                }
            }

            quesAns.push(quesItem);
        }

        res.send(quesAns)

    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});


// @route   GET api/admin/students
// @desc    Get all students
// @access  Private
router.get("/students", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { role } = rows[0];

    if (role === "counsellor") {
        // Get admin details from the DB
        const [rows] = await promisePool.query(
            `SELECT * from students`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

module.exports = router;