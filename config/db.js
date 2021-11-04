const mysql = require("mysql2"); // Connect to the DB

// Create the pool
const pool = mysql.createPool({
    host: "remotemysql.com",
    user: "PCige3566j",
    password: "0rgo2Zpkd4",
    database: "PCige3566j",
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

module.exports = promisePool;