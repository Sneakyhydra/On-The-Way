// Imports
const express = require('express'); // Create router
const bcrypt = require('bcryptjs'); // Encrypt password
const jwt = require('jsonwebtoken'); // Authorization
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('./db');
// Init router
const router = express.Router();

// Endpoints
/**
 * Get logged in user
 * Login
 * Delete cookie / logout
 * Validate user
 */

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
	// Extract user id from req
	const user_id = req.user_id;

	try {
		// Get user_email and role from DB
		const [rows] = await promisePool.query(
			`SELECT user_email, role from logins WHERE user_id='${user_id}'`
		);

		// Extract user_email and role from rows
		const { user_email, role } = rows[0];

		// Create user object
		let user = {
			user_id,
			user_email,
			role,
		};

		// Check the role
		if (role === 'counsellor') {
			// Get counsellor details from the DB
			const [rows] = await promisePool.query(
				`SELECT coun_name, coun_gender, coun_phone, coun_dept, coun_status from counsellors WHERE coun_id='${user_id}'`
			);

			// Extract the details in variables
			const { coun_name, coun_gender, coun_phone, coun_dept, coun_status } =
				rows[0];

			// Store the details in the user object
			user = {
				...user,
				coun_name,
				coun_gender,
				coun_phone,
				coun_dept,
				coun_status,
			};
			// Send user object to the client
			res.json(user);
		} else if (role === 'student') {
			// Get student details from the DB
			const [rows] = await promisePool.query(
				`SELECT stud_name, roll_no, stud_gender, stud_phone, stud_dept, stud_branch from students WHERE stud_id='${user_id}'`
			);

			// Extract the details in variables
			const {
				stud_name,
				roll_no,
				stud_gender,
				stud_phone,
				stud_dept,
				stud_branch,
			} = rows[0];

			// Store the details in the user object
			user = {
				...user,
				stud_name,
				roll_no,
				stud_gender,
				stud_phone,
				stud_dept,
				stud_branch,
				cpi: null,
				response: null,
			};

			// List of responses from last quiz given by student
			let finalResp = [];

			// Get response ids
			const [respID] = await promisePool.query(
				`SELECT res_id FROM response WHERE stud_id=${user_id}`
			);

			// If response id exists
			if (respID.length > 0) {
				// Store the last one as it is the latest
				const res_id = respID[respID.length - 1].res_id;

				// Get all answer ids of that response
				const [resps] = await promisePool.query(
					`SELECT ans_id FROM response_list WHERE res_id=${res_id}`
				);

				// Loop through all answer ids
				for (let i = 0; i < resps.length; i++) {
					// Get responses of those answers
					const [temp] = await promisePool.query(
						`SELECT response FROM answers WHERE ans_id=${resps[i].ans_id}`
					);

					// If a response exists
					if (temp.length > 0) {
						// Push that in our final array
						finalResp.push(temp[0].response);
					}
				}
			}

			// Store it in user object
			user.response = finalResp;

			const [rows2] = await promisePool.query('SELECT * from cpi_sheet');

			// Loop through all rows in excel sheet
			for (let j = 0; j < rows2.length; j++) {
				// Check if roll no is same
				if (user.roll_no.toLowerCase() === rows2[j].roll_no.toLowerCase()) {
					// Add cpi to the user object
					user.cpi = rows2[j].cpi;
					break;
				}
			}
			// Send data to the client
			res.send(user);
		} else if (role === 'admin') {
			// Get admin details from the DB
			const [rows] = await promisePool.query(
				`SELECT admin_name, admin_gender, admin_phone from admins WHERE admin_id='${user_id}'`
			);

			// Extract the details in variables
			const { admin_name, admin_gender, admin_phone } = rows[0];

			// Store the details in the user object
			user = {
				...user,
				admin_name,
				admin_gender,
				admin_phone,
			};
			// Send user object to the client
			res.json(user);
		}
	} catch (err) {
		// Catch errors
		res.status(500).send('Server Error');
	}
});

// @route   POST api/auth
// @desc    Authorize user and get token
// @access  Public
router.post(
	'/',
	[
		check('user_email', 'email is required').notEmpty(), // Check email
		check('user_password', 'Password is required').exists(), // Check password
	],
	async (req, res) => {
		// Check if there are errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Return the errors
			return res.status(400).json({ errors: errors.array() });
		}

		// Extract userEmail and password from the body
		const userEmail = req.body.user_email;
		const password = req.body.user_password;

		try {
			// Check if the user exists
			const [existence] = await promisePool.query(
				`SELECT EXISTS(SELECT * from logins WHERE user_email= "${userEmail}" ) 'EXISTS' FROM dual`
			);

			// Extract the bool
			const result = existence[0].EXISTS;

			// Check if result is false
			if (!result) {
				// User doesn't exist
				return res.status(400).json({ msg: 'Invalid Credentials' });
			} else {
				// Get user details from DB
				const [rows] = await promisePool.query(
					`SELECT * from logins WHERE user_email='${userEmail}'`
				);

				// Extract the user_id and user_password from the rows
				const { user_id, user_password } = rows[0];

				// Check the password
				const isMatch = await bcrypt.compare(password, user_password);

				if (!isMatch) {
					// Password doesn't match
					return res.status(400).json({ msg: 'Invalid Credentials' });
				} else {
					// Store user_id in payload for token
					const payload = {
						id: user_id,
					};

					// Create a token
					const token = jwt.sign(payload, process.env.JWT_SECRET, {
						expiresIn: 21600,
					});

					// Store the token in an httpOnly cookie
					res.cookie('token', token, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: 6 * 60 * 60 * 1000,
						sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
					});

					// Send success message to client
					res.send('Logged in');
				}
			}
		} catch (err) {
			// Catch errors
			res.status(500).send({ errors: [err] });
		}
	}
);

// @route   DELETE api/auth
// @desc    Delete cookie
// @access  Private
router.delete('/', auth, async (req, res) => {
	// Delete the cookie
	res.cookie('token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: 0,
		sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
	});

	// Send success message to client
	res.send('Logged out');
});

// @route   GET api/auth/check
// @desc    Validate user
// @access  Private
router.get('/check', async (req, res) => {
	// Get token from cookies
	const token = req.cookies.token;

	// Check if token exists
	if (!token) {
		res.cookie('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			maxAge: 0,
			sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
		});
		res.send('No token');
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		res.send('Valid');
	} catch (err) {
		console.log('Invalid');
	}
});

module.exports = router;
