// Imports
const express = require("express"); // Create server
const cors = require("cors"); // Cors middleware
const cookieParser = require("cookie-parser"); // Cookies
const path = require("path");
require('dotenv').config()

// Init app
const app = express();

// Store port number in a variable
const port = process.env.SERVER_PORT || 4000;

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/editUsers", require("./routes/editUsers"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/counsellor", require("./routes/counsellor"));
app.use("/api/student", require("./routes/student"));

app.use(express.static('client/build'));

app.get("/*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));


// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
