const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');
const staffController = require('../controllers/staffController');
const appointmentController = require('../controllers/appointmentController');
const { requireStaff } = require('../middleware/authMiddleware');
const shelterController = require('../controllers/shelterController');

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

// Allow authorized staff to approve or reject applications
router.post(
    '/staff/applications/status',
    requireStaff,
    applicationController.changeApplicationStatus
);

// GET request to show the appointment page
router.get('/appointments', appointmentController.getAppointmentForm);

// POST request to handle form submission
router.post('/appointments', appointmentController.createAppointment);

 // Allow authorized staff to confirm or cancel appointments
router.post(
    '/staff/appointments/status',
    requireStaff,
    appointmentController.changeAppointmentStatus
);


// Display shelter locations using Shelter objects
router.get('/locations', shelterController.showLocations);


module.exports = router;