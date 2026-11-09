const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');
const staffController = require('../controllers/staffController');
const { requireStaff } = require('../middleware/authMiddleware');

// homepage route
router.get('/', (req, res) => {
    res.render('index');
});

// Available pets route
router.get('/pets', petController.showPets);

// display adoption application form
router.get('/adopt', applicationController.showAdoptionForm);

// submit adoption application
router.post('/applications', applicationController.submitApplication);

// Display staff login page
router.get('/login', authController.showLogin);

// Process staff login
router.post('/login', authController.login);

// Log out staff
router.post('/logout', authController.logout);

// Protected staff dashboard
router.get('/staff', requireStaff, staffController.showDashboard);

module.exports = router;