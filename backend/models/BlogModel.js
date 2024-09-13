const db = require('../config/db'); // Import the db connection

// Function to create a new blog
const createBlog = (userId, title, content, imageUrl, callback) => {
  const query = 'INSERT INTO blogs (user_id, title, content, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, title, content, imageUrl], callback);
};

// Function to get all blogs
const getAllBlogs = (callback) => {
  const query = 'SELECT * FROM blogs';
  db.query(query, callback);
};

// Function to get a blog by ID
const getBlogById = (id, callback) => {
  const query = 'SELECT * FROM blogs WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    // Assuming the query returns an array of results
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};


// Function to get all blogs by user ID
const getBlogsByUserId = (userId, callback) => {
  const query = 'SELECT * FROM blogs WHERE user_id = ?';
  db.query(query, [userId], callback);
};

// Function to update a blog by ID
const updateBlog = (id, title, content, imageUrl, callback) => {
  const query = 'UPDATE blogs SET title = ?, content = ?, image_url = ? WHERE id = ?';
  db.query(query, [title, content, imageUrl, id], callback);
};

// Function to delete a blog by ID
const deleteBlog = (id, callback) => {
  const query = 'DELETE FROM blogs WHERE id = ?';
  db.query(query, [id], callback);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  updateBlog,
  deleteBlog,
};
