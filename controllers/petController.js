const petService = require('../services/petService');

// Display all available pets with optional type and location filters
function showPets(req, res) {
    const type = req.query.type || 'All';
    const location = req.query.location || '';

    // Fetch filtered pets based on both type and location
    const pets = petService.getFilteredPets(type, location);

    res.render('pets', {
        pets: pets,
        selectedType: type,
        selectedLocation: location
    });
}

module.exports = { showPets };