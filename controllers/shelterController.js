const shelterService = require('../services/shelterService');

// Display all shelter locations
function showLocations(req, res) {
    const shelters = shelterService.getAllShelters();

    res.render('locations', {
        shelters: shelters
    });
}

module.exports = { showLocations };