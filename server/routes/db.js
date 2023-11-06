const mysql = require("mysql2"); // Connect to the DB

// Create the pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
});

// Get a Promise wrapped instance of that pool
const promisePool = pool.promise();

module.exports = promisePool;
