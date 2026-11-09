const applicationService = require('../services/applicationService');
const petService = require('../services/petService');

// Dislplay the adoption application form
function showAdoptionForm(req, res) {
    const pets = petService.getAllPets();

    res.render('adopt', { pets: pets });
}

// handle an adoption application submission
function submitApplication(req, res) {
    const { name, email, phone, petId } = req.body;

    try {
        const application = applicationService.createApplication(
            name, email, phone, petId
        );

        res.status(201).send('Adoption application submitted successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = { showAdoptionForm, submitApplication };