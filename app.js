// Imports
const express = require("express");
const cors = require("cors"); // Cors middleware

// Init app
const app = express();

// Store port number in a variable
const port = process.env.PORT || 5000;

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/editUsers', require('./routes/editUsers'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/counsellor', require('./routes/counsellor'));

// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));