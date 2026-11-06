const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Homepage route
router.get('/', (req, res) => {
    res.render('index');
});

// Available pets route
router.get('/pets', petController.showPets);

module.exports = router;