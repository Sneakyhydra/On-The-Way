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

// @route   GET api/admin/questions
// @desc    Get all questions
// @access  Private
router.get("/questions", auth, async(req, res) => {
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
            `SELECT * from questions`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

// @route   GET api/admin/answers
// @desc    Get all answers
// @access  Private
router.get("/answers", auth, async(req, res) => {
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
            `SELECT * from answers`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

// @route   PUT api/admin/quiz
// @desc    Edit quiz
// @access  Private
router.put("/quiz", auth, async(req, res) => {
    const user_id = req.user_id;

    // Get user_email and role from DB
    const [rows] = await promisePool.query(
        `SELECT role from logins WHERE user_id='${user_id}'`
    );

    // Extract user_email and role from rows
    const { role } = rows[0];

    const compareQues = (a, b) => {
        if (a.ques_no < b.ques_no) {
            return -1;
        }
        if (a.ques_no > b.ques_no) {
            return 1;
        }
        return 0;
    };

    const compareAns = (a, b) => {
        if (a.ans_no < b.ans_no) {
            return -1;
        }
        if (a.ans_no > b.ans_no) {
            return 1;
        }
        return 0;
    };

    if (role === "admin") {
        let questions = req.body.questions;
        let answers = req.body.answers;

        let finalAns = []
        questions.sort(compareQues);

        for (let i = 0; i < questions.length; i++) {
            let choices = []
            for (let j = 0; j < answers.length; j++) {
                if (questions[i].ques_id === answers[j].ques_id) {
                    choices.push(answers[j])
                }
            }

            choices.sort(compareAns);
            finalAns.push(...choices);
        }

        try {
            const emptyAnswersSQL = "DELETE FROM answers WHERE ans_id > 0;"
            const resetAnswersSQL = "ALTER TABLE answers AUTO_INCREMENT = 1;"
            const emptyQuestionsSQL = "DELETE FROM questions WHERE ques_id > 0;"

            const [empAns] = await promisePool.query(emptyAnswersSQL);
            const [resAns] = await promisePool.query(resetAnswersSQL);
            const [empQues] = await promisePool.query(emptyQuestionsSQL);

            for (let i = 0; i < questions.length; i++) {
                const [upQues] = await promisePool.query(`INSERT INTO questions (ques_no, ques_desc, ques_id) VALUES (${questions[i].ques_no}, "${questions[i].ques_desc}", ${questions[i].ques_id})`);
            }

            for (let i = 0; i < finalAns.length; i++) {
                const [upAns] = await promisePool.query(`INSERT INTO answers (ques_id, ans_no, ans_desc, response) VALUES (${finalAns[i].ques_id}, ${finalAns[i].ans_no}, "${finalAns[i].ans_desc}", "${finalAns[i].response}")`);
            }

            res.send("Quiz Updated");

        } catch (err) {
            throw err;
        }
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }

});

module.exports = router;