const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController'); // Ensure this path is correct
const multer = require('multer');
const path = require('path');
const isAuthenticated = require('../middleware/authMiddleware'); // Ensure this path is correct

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route to get all blogs
router.get('/', BlogController.getAllBlogs);

// Route to get a blog by ID
router.get('/blogs/:id', BlogController.getBlogById);

// Route to get all blogs by user ID (authentication required)
router.get('/users/:userId', isAuthenticated, BlogController.getBlogsByUserId);

// Route to get all blogs for the currently authenticated user
router.get('/me/blogs', isAuthenticated, BlogController.getBlogsForCurrentUser);

// Route to create a new blog (requires authentication)
router.post('/blogs', isAuthenticated, upload.single('image'), BlogController.createBlog);

// Route to update a blog by ID (requires authentication)
router.put('/blogs/:id', isAuthenticated, upload.single('image'), (req, res, next) => {
  console.log('Update Request:', req.body, req.file, req.session.userId);
  next();
}, BlogController.updateBlog);


// Route to delete a blog by ID (requires authentication)
router.delete('/blogs/:id', isAuthenticated, BlogController.deleteBlog);

module.exports = router;
