const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');
const path = require('path');


const app = express();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Allow cookies to be sent with requests
}));



// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kshitij@8922',
  database: 'test',
});

// Set up session store options
const sessionStore = new MySQLStore({
  // Your MySQL connection options
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Kshitij@8922',
  database: 'test',
  createDatabaseTable: true, // Create table if not exists
  // Note: Ensure column names match the expected ones
  clearExpired: true,
  checkExpirationInterval: 900000, // Check expiration interval (in ms)
  expiration: 86400000 // Session expiration time (in ms)
});

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/users', userRoutes);
app.use('/api', blogRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
