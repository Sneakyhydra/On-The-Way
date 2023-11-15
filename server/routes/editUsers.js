// Imports
const express = require('express'); // Create router
const bcrypt = require('bcryptjs'); // Encrypt password
const auth = require('../middleware/auth'); // Middleware
const { check, validationResult } = require('express-validator'); // Check and validate the inputs
const promisePool = require('./db');
// Init router
const router = express.Router();

// Endpoints
/**
 * Edit admin
 * Edit counsellor
 * Edit student
 */

// @route   PUT api/editUsers/admin1234
// @desc    Edit admin
// @access  Private
router.put(
	'/admin1234',
	[
		auth,
		check('user_email', 'email is required').isEmail(), // Check the email
		check(
			'user_password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }), // Check the password
		check('role', 'Role is required').notEmpty(), // Check the role
		check('admin_name', 'Name is required').notEmpty(), // Check the name
		check('admin_gender', 'Gender is required').notEmpty(), // Check the gender
		check('admin_phone', 'Phone is required').notEmpty(), // Check the phone
		check('admin_id', 'ID is required').notEmpty(), // Check the phone
	],
	async (req, res) => {
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
					admin_id,
				} = req.body;

				// Create user object
				const user = {
					user_email,
					user_password,
					role,
					admin_name,
					admin_gender,
					admin_phone,
				};

				// Check role
				if (role !== 'admin') {
					return res.status(400).json({ msg: 'Role is not valid' });
				}

				// Check gender
				if (
					admin_gender !== 'Male' &&
					admin_gender !== 'Female' &&
					admin_gender !== 'Other'
				) {
					return res.status(400).json({ msg: 'Gender is not valid' });
				}

				// Check id
				if (user_id !== admin_id) {
					return res.status(400).json({ msg: 'Invalid id' });
				}

				// Check if user exists
				const [rows] = await promisePool.query(
					`SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" AND user_id<>${user_id}) "EXISTS" FROM DUAL`
				);
				const result = rows[0].EXISTS;

				if (result) {
					// User already exists
					return res.status(400).json({ msg: 'User already exists' });
				} else {
					// Encrypt Password
					const salt = await bcrypt.genSalt(10);
					user_password = await bcrypt.hash(user_password, salt);

					// Update details in logins table
					await promisePool.query(
						`UPDATE logins SET user_email='${user_email}', user_password='${user_password}' WHERE user_id=${user_id}`
					);

					// Update details in admins table
					await promisePool.query(
						`UPDATE admins SET admin_name='${admin_name}', admin_gender='${admin_gender}', admin_phone='${admin_phone}' WHERE admin_id=${user_id}`
					);

					// Send updated details to the client
					res.send(user);
				}
			} else {
				// Unauthorized
				res.status(401).json({ msg: 'Only admins can access this portal' });
			}
		} catch (err) {
			// Catch errors
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT api/editUsers/counsellor
// @desc    Edit counsellor
// @access  Private
router.put(
	'/counsellor',
	[
		auth,
		check('user_email', 'email is required').isEmail(), // Check the email
		check(
			'user_password',
			'Please enter a password with 3 or more characters'
		).isLength({ min: 3 }), // Check the password
		check('role', 'Role is required').notEmpty(), // Check the role
		check('coun_name', 'Name is required').notEmpty(), // Check the name
		check('coun_gender', 'Gender is required').notEmpty(), // Check the gender
		check('coun_phone', 'Phone is required').notEmpty(), // Check the phone
		check('coun_id', 'ID is required').notEmpty(), // Check the phone
		check('coun_dept', 'Dept is required').notEmpty(), // Check the dept
	],
	async (req, res) => {
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
			if (role === 'counsellor') {
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
					coun_name,
					coun_gender,
					coun_phone,
					coun_id,
					coun_dept,
				} = req.body;

				// Create user object
				const user = {
					user_email,
					user_password,
					role,
					coun_name,
					coun_gender,
					coun_phone,
					coun_dept,
				};

				// Check role
				if (role !== 'counsellor') {
					return res.status(400).json({ msg: 'Role is not valid' });
				}

				// Check gender
				if (
					coun_gender !== 'Male' &&
					coun_gender !== 'Female' &&
					coun_gender !== 'Other'
				) {
					return res.status(400).json({ msg: 'Gender is not valid' });
				}

				// Check dept
				if (
					coun_dept !== 'B.Tech' &&
					coun_dept !== 'M.Tech' &&
					coun_dept !== 'B.Des' &&
					coun_dept !== 'M.Des' &&
					coun_dept !== 'P.hd'
				) {
					return res.status(400).json({ msg: 'Programme(dept) is not valid' });
				}

				// Check id
				if (user_id !== coun_id) {
					return res.status(400).json({ msg: 'Invalid id' });
				}

				// Check if user exists
				const [rows] = await promisePool.query(
					`SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" AND user_id<>${user_id}) "EXISTS" FROM DUAL`
				);
				const result = rows[0].EXISTS;

				if (result) {
					// User already exists
					return res.status(400).json({ msg: 'User already exists' });
				} else {
					// Encrypt Password
					const salt = await bcrypt.genSalt(10);
					user_password = await bcrypt.hash(user_password, salt);

					// Update details in logins table
					await promisePool.query(
						`UPDATE logins SET user_email='${user_email}', user_password='${user_password}' WHERE user_id=${user_id}`
					);

					// Update details in counsellors table
					await promisePool.query(
						`UPDATE counsellors SET coun_name='${coun_name}', coun_gender='${coun_gender}', coun_phone='${coun_phone}', coun_dept='${coun_dept}' WHERE coun_id=${user_id}`
					);

					// Send updated details to the client
					res.send(user);
				}
			} else {
				// Unauthorized
				res
					.status(401)
					.json({ msg: 'Only counsellors can access this portal' });
			}
		} catch (err) {
			// Catch errors
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT api/editUsers/student
// @desc    Edit student
// @access  Private
router.put(
	'/student',
	[
		auth,
		check('user_email', 'email is required').isEmail(), // Check the email
		check(
			'user_password',
			'Please enter a password with 3 or more characters'
		).isLength({ min: 3 }), // Check the password
		check('role', 'Role is required').notEmpty(), // Check the role
		check('stud_name', 'Name is required').notEmpty(), // Check the name
		check('stud_gender', 'Gender is required').notEmpty(), // Check the gender
		check('stud_phone', 'Phone is required').notEmpty(), // Check the phone
		check('stud_id', 'ID is required').notEmpty(), // Check the phone
		check('stud_dept', 'Dept is required').notEmpty(), // Check the dept
		check('roll_no', 'Roll no is required').notEmpty(), // Check the roll no
		check('stud_branch', 'Branch is required').notEmpty(), // Check the branch
	],
	async (req, res) => {
		// Extract user id from req
		const user_id = req.user_id;

		try {
			// Get role of the user from DB
			const [rows] = await promisePool.query(
				`SELECT role from logins WHERE user_id='${user_id}'`
			);

			// Extract role from rows
			const { role } = rows[0];

			// Check if the user is student
			if (role === 'student') {
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
					stud_name,
					roll_no,
					stud_gender,
					stud_phone,
					stud_dept,
					stud_branch,
					stud_id,
				} = req.body;

				// Create user object
				let user = {
					user_email,
					user_password,
					role,
					stud_name,
					stud_gender,
					stud_phone,
					stud_dept,
					stud_branch,
					roll_no,
					cpi: null,
				};

				// Check id
				if (user_id !== stud_id) {
					return res.status(400).json({ msg: 'Invalid id' });
				}

				// Check role
				if (role !== 'student') {
					return res.status(400).json({ msg: 'Role is not valid' });
				}

				// Check gender
				if (
					stud_gender !== 'Male' &&
					stud_gender !== 'Female' &&
					stud_gender !== 'Other'
				) {
					return res.status(400).json({ msg: 'Gender is not valid' });
				}

				// Check dept
				if (
					stud_dept !== 'B.Tech' &&
					stud_dept !== 'M.Tech' &&
					stud_dept !== 'B.Des' &&
					stud_dept !== 'M.Des' &&
					stud_dept !== 'P.hd'
				) {
					return res.status(400).json({ msg: 'Programme(dept) is not valid' });
				}

				// Check branch
				if (
					stud_branch !== 'CSE' &&
					stud_branch !== 'ECE' &&
					stud_branch !== 'Des' &&
					stud_branch !== 'ME' &&
					stud_branch !== 'NS'
				) {
					return res.status(400).json({ msg: 'Branch is not valid' });
				}

				// Check if user exists
				const [rows] = await promisePool.query(
					`SELECT EXISTS(SELECT * from logins WHERE user_email = "${user_email}" AND user_id<>${user_id} ) "EXISTS" FROM DUAL`
				);
				const result = rows[0].EXISTS;

				if (result) {
					// User already exists
					return res.status(400).json({ msg: 'User already exists' });
				} else {
					// Encrypt Password
					const salt = await bcrypt.genSalt(10);
					user_password = await bcrypt.hash(user_password, salt);

					try {
						// Update details in logins table
						await promisePool.query(
							`UPDATE logins SET user_email='${user_email}', user_password='${user_password}' WHERE user_id=${user_id}`
						);

						// Update details in students table
						await promisePool.query(
							`UPDATE students SET stud_name='${stud_name}', stud_gender='${stud_gender}', stud_phone='${stud_phone}', stud_dept='${stud_dept}', stud_branch='${stud_branch}', roll_no='${roll_no}' WHERE stud_id=${user_id}`
						);
					} catch (err) {
						// Catch errors
						res.status(500).send('Server Error');
					}

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
					res.json(user);
				}
			} else {
				// Unauthorized
				res.status(401).json({ msg: 'Only students can access this portal' });
			}
		} catch (err) {
			// Catch errors
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
