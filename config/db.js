const mysql = require("mysql2"); // Connect to the DB

// Create the pool
const pool = mysql.createPool({
    host: "db4free.net",
    port: 3306,
    user: "sneakyhydra",
    password: "sneakyhydra",
    database: "studentcoun",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

module.exports = promisePool;