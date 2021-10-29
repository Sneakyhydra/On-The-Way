// Imports
const express = require("express"); // To create router
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

// Endpoints

// @route   GET api/admin/quesans
// @desc    Get all questions and answers
// @access  Private
router.get("/quesans", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {

            // Get all questions from the DB
            const [ques] = await promisePool.query(
                `SELECT * from questions`
            );

            // Get all answers from the DB
            const [ans] = await promisePool.query(
                `SELECT * from answers`
            );

            // Init array to be sent to the client
            let quesAns = [];

            // Element of quesAns
            let quesItem = {
                ques_id: null,
                ques_desc: null,
                ques_no: null,
                answers: []
            };

            // Element of quesItem
            let ansItem = {
                ans_id: null,
                ans_no: null,
                ans_desc: null,
                response: null
            };

            // Loop through all the questions
            for (let i = 0; i < ques.length; i++) {
                // Store question details in quesItem
                quesItem = {
                    ques_id: ques[i].ques_id,
                    ques_desc: ques[i].ques_desc,
                    ques_no: ques[i].ques_no,
                    answers: []
                };

                // Loop through all the answers
                for (let j = 0; j < ans.length; j++) {
                    // Add answer of this question to ansItem
                    if (ans[j].ques_id === ques[i].ques_id) {
                        ansItem = {
                            ans_id: ans[j].ans_id,
                            ans_no: ans[j].ans_no,
                            ans_desc: ans[j].ans_desc,
                            response: ans[j].response,
                        };

                        // Append ansItem to quesItem.answers
                        quesItem.answers.push(ansItem);
                    }
                }

                // Append quesItem to quesAns
                quesAns.push(quesItem);
            }

            // Send data to the client
            res.send(quesAns);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   PUT api/admin/quiz
// @desc    Edit quiz
// @access  Private
router.put("/quiz", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    // Function to sort questions by ques_no
    const compareQues = (a, b) => {
        if (a.ques_no < b.ques_no) {
            return -1;
        }
        if (a.ques_no > b.ques_no) {
            return 1;
        }
        return 0;
    };

    // Function to sort answers by ans_no
    const compareAns = (a, b) => {
        if (a.ans_no < b.ans_no) {
            return -1;
        }
        if (a.ans_no > b.ans_no) {
            return 1;
        }
        return 0;
    };

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Extract quesAns from body
            let quesAns = req.body.quesAns;

            // Sort all questions
            quesAns.sort(compareQues);

            // Sort all answers
            for (let i = 0; i < quesAns.length; i++) {
                quesAns[i].answers.sort(compareAns);
            }

            // SQL Queries
            const emptyAnswersSQL = "DELETE FROM answers WHERE ans_id > 0;";
            const resetAnswersSQL = "ALTER TABLE answers AUTO_INCREMENT = 1;";
            const emptyQuestionsSQL = "DELETE FROM questions WHERE ques_id > 0;";

            // Empty the answers table
            await promisePool.query(emptyAnswersSQL);

            // Reset auto increment in answers table
            await promisePool.query(resetAnswersSQL);

            // Empty the questions table
            await promisePool.query(emptyQuestionsSQL);

            // Loop through all questions
            for (let i = 0; i < quesAns.length; i++) {
                // Insert question details in questions table
                await promisePool.query(`INSERT INTO questions (ques_no, ques_desc, ques_id) VALUES (${quesAns[i].ques_no}, "${quesAns[i].ques_desc}", ${quesAns[i].ques_id})`);

                // Loop through all answers of this question
                for (let j = 0; j < quesAns[i].answers.length; j++) {
                    // Insert answer details in answers table
                    await promisePool.query(`INSERT INTO answers (ques_id, ans_no, ans_desc, response) VALUES (${quesAns[i].ques_id}, ${quesAns[i].answers[j].ans_no}, "${quesAns[i].answers[j].ans_desc}", "${quesAns[i].answers[j].response}")`);
                }
            }

            // Success
            res.send("Quiz Updated");
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   GET api/admin/pending
// @desc    Get pending counsellors
// @access  Private
router.get("/pending", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Get counsellors with coun_status=Pending from the DB
            const [rows] = await promisePool.query(
                `SELECT * from counsellors WHERE coun_status="Pending"`
            );

            // Send data to the client
            res.json(rows);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   PUT api/admin/pending
// @desc    APPROVE or REJECT a counsellor
// @access  Private
router.put("/pending", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Update coun_status of counsellor with coun_id=req.body.id
            await promisePool.query(
                `UPDATE counsellors SET coun_status='${req.body.type}' WHERE coun_id=${req.body.id}`
            );

            // Success
            res.json({ msg: "Updated Successfully" });
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   GET api/admin/rejected
// @desc    Get rejected counsellors
// @access  Private
router.get("/rejected", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Get counsellors with coun_status=Rejected from the DB
            const [rows] = await promisePool.query(
                `SELECT * from counsellors WHERE coun_status="Rejected"`
            );

            // Send data to the client
            res.json(rows);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch error
        throw err;
    }
});

// @route   GET api/admin/approved
// @desc    Get approved counsellors
// @access  Private
router.get("/approved", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Get counsellors with coun_status=Approved from the DB
            const [rows] = await promisePool.query(
                `SELECT * from counsellors WHERE coun_status="Approved"`
            );

            // Send data to the client
            res.json(rows);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   GET api/admin/students
// @desc    Get all students
// @access  Private
router.get("/students", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role of the user from DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is admin
        if (role === "admin") {
            // Get all students from the DB
            const [rows] = await promisePool.query(
                `SELECT * from students`
            );

            // Send data to the client
            res.json(rows);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only admins can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

module.exports = router;