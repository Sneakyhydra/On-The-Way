// Imports
const express = require('express'); // Create router
const auth = require('../middleware/auth'); // Middleware
const promisePool = require('./db'); // Import instance of mysql pool

// Init router
const router = express.Router();

// Endpoints
/**
 * Get all questions and answers
 * Edit quiz
 * Get pending counsellors
 * Approve or Reject a counsellor
 * Get rejected counsellors
 * Get approved counsellors
 * Get all students
 * Get stud feedback
 * Get coun feedback
 * Delete stud feedback
 * Delete coun feedback
 */

// @route   GET api/admin/quesans
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

		// Check if the user is admin
		if (role === 'admin') {
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
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/admin/quiz
// @desc    Edit quiz
// @access  Private
router.put('/quiz', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Extract quesAns from body
			let quesAns = req.body.quesAns;

			// Sort all questions
			quesAns.sort(compareQues);

			// Sort all answers
			for (let i = 0; i < quesAns.length; i++) {
				quesAns[i].answers.sort(compareAns);
			}

			// Loop through all questions
			for (let i = 0; i < quesAns.length; i++) {
				// Update question details in questions table
				await promisePool.query(
					`UPDATE questions SET ques_desc="${quesAns[i].ques_desc}" WHERE ques_id=${quesAns[i].ques_id}`
				);

				// Loop through all answers of this question
				for (let j = 0; j < quesAns[i].answers.length; j++) {
					// Update answer details in answers table
					await promisePool.query(
						`UPDATE answers SET ans_desc="${quesAns[i].answers[j].ans_desc}", response="${quesAns[i].answers[j].response}" WHERE ans_id=${quesAns[i].answers[j].ans_id}`
					);
				}
			}

			// Success
			res.send('Quiz Updated');
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/pending
// @desc    Get pending counsellors
// @access  Private
router.get('/pending', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Get counsellors with coun_status=Pending from the DB
			const [rows] = await promisePool.query(
				`SELECT * from counsellors WHERE coun_status="Pending"`
			);

			// Send data to the client
			res.json(rows);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/admin/pending
// @desc    APPROVE or REJECT a counsellor
// @access  Private
router.put('/pending', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Update coun_status of counsellor with coun_id=req.body.id
			await promisePool.query(
				`UPDATE counsellors SET coun_status='${req.body.type}' WHERE coun_id=${req.body.id}`
			);

			// Success
			res.json({ msg: 'Updated Successfully' });
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/rejected
// @desc    Get rejected counsellors
// @access  Private
router.get('/rejected', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Get counsellors with coun_status=Rejected from the DB
			const [rows] = await promisePool.query(
				`SELECT * from counsellors WHERE coun_status="Rejected"`
			);

			// Send data to the client
			res.json(rows);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch error
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/approved
// @desc    Get approved counsellors
// @access  Private
router.get('/approved', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Get counsellors with coun_status=Approved from the DB
			const [rows] = await promisePool.query(
				`SELECT * from counsellors WHERE coun_status="Approved"`
			);

			// Send data to the client
			res.json(rows);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/students
// @desc    Get all students
// @access  Private
router.get('/students', auth, async (req, res) => {
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
		if (role === 'admin') {
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
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/counfeed
// @desc    Get counsellor feedbacks
// @access  Private
router.get('/counfeed', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Get counsellors with coun_status=Pending from the DB
			const [rows] = await promisePool.query(`SELECT * from coun_feedback`);

			// Get all counsellors
			const [rows1] = await promisePool.query(`SELECT * from counsellors`);

			let finalFeed = [];
			for (let i = 0; i < rows.length; i++) {
				let temp = {
					coun_id: rows[i].coun_id,
					feed_id: rows[i].feed_id,
					feed_desc: rows[i].feed_desc,
					coun_name: null,
				};
				for (let j = 0; j < rows1.length; j++) {
					if (rows1[j].coun_id === rows[i].coun_id) {
						temp.coun_name = rows1[j].coun_name;
						break;
					}
				}
				finalFeed.push(temp);
			}

			// Send data to the client
			res.json(finalFeed);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   GET api/admin/studfeed
// @desc    Get student feedbacks
// @access  Private
router.get('/studfeed', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Get counsellors with coun_status=Pending from the DB
			const [rows] = await promisePool.query(`SELECT * from stud_feedback`);
			// Get all students
			const [rows1] = await promisePool.query(`SELECT * from students`);

			let finalFeed = [];
			for (let i = 0; i < rows.length; i++) {
				let temp = {
					stud_id: rows[i].stud_id,
					feed_id: rows[i].feed_id,
					feed_desc: rows[i].feed_desc,
					stud_name: null,
				};
				for (let j = 0; j < rows1.length; j++) {
					if (rows1[j].stud_id === rows[i].stud_id) {
						temp.stud_name = rows1[j].stud_name;
						break;
					}
				}
				finalFeed.push(temp);
			}

			// Send data to the client
			res.json(finalFeed);
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/admin/counfeed
// @desc    Delete counsellor feedback
// @access  Private
router.delete('/counfeed', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Delete counsellor feedback with the given feed_id
			await promisePool.query(
				`DELETE FROM coun_feedback WHERE feed_id=${req.body.feed_id}`
			);

			// Send success message to the client
			res.send('Deleted Successfully');
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/admin/studfeed
// @desc    Delete student feedbacks
// @access  Private
router.delete('/studfeed', auth, async (req, res) => {
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
		if (role === 'admin') {
			// Delete student feedback with the given feed_id
			await promisePool.query(
				`DELETE FROM stud_feedback WHERE feed_id=${req.body.feed_id}`
			);

			// Send success message to the client
			res.send('Deleted Successfully');
		} else {
			// Unauthorized
			res.status(401).json({ msg: 'Only admins can access this portal' });
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

module.exports = router;
