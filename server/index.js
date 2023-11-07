// Imports
const express = require('express'); // Create server
const cors = require('cors'); // Cors middleware
const cookieParser = require('cookie-parser'); // Cookies
require('dotenv').config();

// Init app
const app = express();

// Store port number in a variable
const port = process.env.SERVER_PORT || 5000;

var whitelist = ['http://localhost:3000', 'http://localhost:3000/'];
// Init middleware
app.use(express.json({ extended: false }));
app.use(
	cors({
		origin:
			process.env.ACCESS_CONTROL_ORIGIN ||
			function (origin, callback) {
				if (whitelist.indexOf(origin) !== -1) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			},
		credentials: true,
	})
);
app.use(cookieParser());

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/editUsers', require('./routes/editUsers'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/counsellor', require('./routes/counsellor'));
app.use('/api/student', require('./routes/student'));

// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
