const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'gmedia.bz',
  user: 'gmedia_democase2',
  password: 'Janglidalam29J',
  database: 'gmedia_democase',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
