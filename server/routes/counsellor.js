// Imports
const express = require('express'); // Create router
const auth = require('../middleware/auth'); // Middleware
const promisePool = require('./db');
// Init router
const router = express.Router();

// Endpoints
/**
 * Get all students
 * Get all questions and answers
 * Submit feedback
 * Send message
 * Get all messages of user
 */

// @route   GET api/counsellor/students
// @desc    Get all students
// @access  Private
router.get('/students', auth, async (req, res) => {
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
		if (role === 'counsellor') {
			// Get all students from the DB
			const [rows] = await promisePool.query(`SELECT * from students`);
			const [rows2] = await promisePool.query('SELECT * from cpi_sheet');

			// Init students array
			let students = [];

			for (let i = 0; i < rows.length; i++) {
				// Init student object
				let student = {
					stud_id: rows[i].stud_id,
					stud_name: rows[i].stud_name,
					roll_no: rows[i].roll_no,
					stud_gender: rows[i].stud_gender,
					stud_phone: rows[i].stud_phone,
					stud_dept: rows[i].stud_dept,
					stud_branch: rows[i].stud_branch,
					cpi: null,
				};

				// Loop through all rows in excel sheet
				for (let j = 0; j < rows2.length; j++) {
					// Check if roll no is same
					if (
						student.roll_no.toLowerCase() === rows2[j].roll_no.toLowerCase()
					) {
						// Add cpi to the student object
						student.cpi = rows2[j].cpi;
						break;
					}
				}

				// Append student object to students array
				students.push(student);
			}
			// Send data to the client
			res.json(students);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only counsellors can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/counsellor/quesans
// @desc    Get all questions and answers
// @access  Private
router.get('/quesans', auth, async (req, res) => {
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
		if (role === 'counsellor') {
			// Get all questions from the DB
			const [ques] = await promisePool.query(`SELECT * from questions`);

			// Get all answers from the DB
			const [ans] = await promisePool.query(`SELECT * from answers`);

			// Init array to be sent to the client
			let quesAns = [];

			// Element of quesAns
			let quesItem = {
				ques_id: null,
				ques_desc: null,
				ques_no: null,
				answers: [],
			};

			// Element of quesItem
			let ansItem = {
				ans_id: null,
				ans_no: null,
				ans_desc: null,
				response: null,
			};

			// Loop through all the questions
			for (let i = 0; i < ques.length; i++) {
				// Store question details in quesItem
				quesItem = {
					ques_id: ques[i].ques_id,
					ques_desc: ques[i].ques_desc,
					ques_no: ques[i].ques_no,
					answers: [],
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
			res.status(401).json({ msg: 'Only counsellors can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   POST api/counsellor/submitFeed
// @desc    Submit feedback
// @access  Private
router.post('/submitFeed', auth, async (req, res) => {
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
		if (role === 'counsellor') {
			// Insert feedback in DB
			await promisePool.query(
				`INSERT INTO coun_feedback (coun_id, feed_desc) VALUES (${user_id}, "${req.body.desc}")`
			);

			// Send success message to the client
			res.send('Submitted Successfully');
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only counsellors can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   POST api/counsellor/message
// @desc    Send message
// @access  Private
router.post('/message', auth, async (req, res) => {
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
		if (role === 'counsellor') {
			// Insert message in DB
			await promisePool.query(
				`INSERT INTO messages (stud_id, coun_id, from_role, mess_desc, mess_date) VALUES (${req.body.stud_id}, ${user_id}, "${role}", "${req.body.mess_desc}", "${req.body.mess_date}")`
			);

			// Send success message to the client
			res.send('Sent Successfully');
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only counsellors can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/counsellor/message
// @desc    Get all messages of user
// @access  Private
router.get('/message', auth, async (req, res) => {
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
		if (role === 'counsellor') {
			// Get messages of this user from DB
			const [messages] = await promisePool.query(
				`SELECT * FROM messages WHERE coun_id=${user_id}`
			);

			// Send data to the client
			res.send(messages);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only counsellors can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

module.exports = router;
