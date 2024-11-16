const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuthenticated = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/register', UserController.registerUser);

// Route to login a user
router.post('/login', UserController.loginUser);

// Route to get user by email (for demonstration purposes)
router.get('/find', UserController.getUserByEmail);

// Route to get all users with blog count (for demonstration purposes)
router.get('/all', UserController.getAllUsers);

router.get('/find/:id', UserController.getUserById);

router.get('/me', isAuthenticated, UserController.getUserInfo);

// Route to logout a user
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.json({ message: 'Logout successful' });
  });
});

module.exports = router;
