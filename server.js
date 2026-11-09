require('dotenv').config();
const session = require('express-session');

const express = require('express');
const path = require('path');
const petRoutes = require('./routes/petRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Middleware for parsing incoming HTML form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, images, front-end JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Makes sure the session secret exists
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is missing from .env');
}

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));


// Application routes
app.use('/', petRoutes);

// Centrsalized error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`PawFinder server listening on http://localhost:${PORT}`);
});