const petService = require('../services/petService');

// Display all available pets

function showPets(req, res) {
    const type = req.query.type || 'All';

    const pets = petService.getPetsByType(type);

    res.render('pets', {
        pets: pets,
        selectedType: type
    });
}


module.exports = { showPets };