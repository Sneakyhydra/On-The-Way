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

    if (role === "admin") {
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
        let quesAns = req.body.quesAns;

        let final = []
        quesAns.sort(compareQues);

        for (let i = 0; i < quesAns.length; i++) {
            quesAns[i].answers.sort(compareAns)
        }

        try {
            const emptyAnswersSQL = "DELETE FROM answers WHERE ans_id > 0;"
            const resetAnswersSQL = "ALTER TABLE answers AUTO_INCREMENT = 1;"
            const emptyQuestionsSQL = "DELETE FROM questions WHERE ques_id > 0;"

            const [empAns] = await promisePool.query(emptyAnswersSQL);
            const [resAns] = await promisePool.query(resetAnswersSQL);
            const [empQues] = await promisePool.query(emptyQuestionsSQL);

            for (let i = 0; i < quesAns.length; i++) {
                await promisePool.query(`INSERT INTO questions (ques_no, ques_desc, ques_id) VALUES (${quesAns[i].ques_no}, "${quesAns[i].ques_desc}", ${quesAns[i].ques_id})`);
                for (let j = 0; j < quesAns[i].answers.length; j++) {
                    await promisePool.query(`INSERT INTO answers (ques_id, ans_no, ans_desc, response) VALUES (${quesAns[i].ques_id}, ${quesAns[i].answers[j].ans_no}, "${quesAns[i].answers[j].ans_desc}", "${quesAns[i].answers[j].response}")`);
                }
            }

            res.send("Quiz Updated");

        } catch (err) {
            throw err;
        }
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }

});

// @route   GET api/admin/counsellors
// @desc    Get all approved counsellors
// @access  Private
router.get("/counsellors", auth, async(req, res) => {
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
            `SELECT * from counsellors WHERE coun_status="Approved"`
        );
        res.json(rows)
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

    if (role === "admin") {
        // Get admin details from the DB
        const [rows] = await promisePool.query(
            `SELECT * from students`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

// @route   GET api/admin/rejected
// @desc    Get rejected counsellors
// @access  Private
router.get("/rejected", auth, async(req, res) => {
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
            `SELECT * from counsellors WHERE coun_status="Rejected"`
        );
        res.json(rows)
    } else {
        res.status(401).json({ msg: "Only admins can access this portal" })
    }
});

module.exports = router;