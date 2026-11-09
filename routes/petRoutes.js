const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const applicationController = require('../controllers/applicationController');

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

module.exports = router;