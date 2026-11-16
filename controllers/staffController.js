const applicationService = require('../services/applicationService');
const appointmentService = require('../services/appointmentService');
const petService = require('../services/petService');

// Display staff dashboard
function showDashboard(req, res) {

    // Retrieve all adoption applications
    const applications = applicationService.getAllApplications();

    // Retrieve appointments and connect them to pets
    const appointments = appointmentService.getAllAppointments().map(
        appointment => {

            const pet = petService.getAllPets().find(
                pet => pet.petId === Number(appointment.petId)
            );

            return {
                ...appointment,
                petName: pet ? pet.name : 'Not selected'
            };
        }
    );

    // Render staff dashboard
    res.render('staff', {
        applications,
        appointments
    });
}

module.exports = {
    showDashboard
};