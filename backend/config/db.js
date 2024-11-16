const mysql = require('mysql2');

// Create a connection to MySQL
const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host
  user: 'root',      // Replace with your MySQL username
  password: 'Kshitij@8922', // Replace with your MySQL password
  database: 'test',  // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
