const mysql = require('mysql2');

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',    // Replace with your MySQL host
  user: 'root',         // Replace with your MySQL username
  password: 'Kshitij@8922', // Replace with your MySQL password
  database: 'test',     // Replace with your database name
});

// Function to check if a user exists by ID
const userExists = (userId, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0].count > 0);
    });
  };
// Function to create a new user
const createUser = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Function to find a user by email
const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Function to get all users
const getAllUsers = (callback) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
const getAllUsersWithBlogCount = (callback) => {
    const query = `
      SELECT users.id, users.name, users.email, users.password, users.created_at, 
             COUNT(blogs.id) AS blog_count
      FROM users
      LEFT JOIN blogs ON users.id = blogs.user_id
      GROUP BY users.id
    `;
    db.query(query, callback);
  };
  const findUserById = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error finding user:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  };

module.exports = {
  findUserById,
    userExists,
    getAllUsersWithBlogCount,
  createUser,
  findUserByEmail,
  getAllUsers, // Export the new function
};
