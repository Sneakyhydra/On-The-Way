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

// @route   GET api/counsellor/students
// @desc    Get all students
// @access  Private
router.get("/students", auth, async(req, res) => {
    // Extract user id from req
    const user_id = req.user_id;

    try {
        // Get role from the DB
        const [rows] = await promisePool.query(
            `SELECT role from logins WHERE user_id='${user_id}'`
        );

        // Extract role from rows
        const { role } = rows[0];

        // Check if the user is counsellor
        if (role === "counsellor") {
            // Get all students from the DB
            const [rows] = await promisePool.query(
                `SELECT * from students`
            );

            // Send data to the client
            res.json(rows);
        } else {
            // Unauthorized
            res.status(401).json({ msg: "Only counsellors can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

// @route   GET api/counsellor/quesans
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

        // Check if the user is counsellor
        if (role === "counsellor") {
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
            res.status(401).json({ msg: "Only counsellors can access this portal" });
        }
    } catch (err) {
        // Catch errors
        throw err;
    }
});

module.exports = router;