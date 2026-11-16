const appointmentService = require('../services/appointmentService');
const applicationService = require('../services/applicationService');
const petService = require('../services/petService');

// Display appointment booking form
exports.getAppointmentForm = (req, res) => {
    const selectedLocation = req.query.location || '';
    const selectedPetId = req.query.petId || '';

    // Get all available pets
    const pets = petService.getAllPets().filter(
        pet => pet.status === 'Available'
    );

    res.render('appointment', {
        selectedLocation,
        selectedPetId,
        pets
    });
};

// Create a new appointment
exports.createAppointment = (req, res) => {
    const {
        name,
        email,
        appointmentDate,
        location,
        notes,
        petId
    } = req.body;

    try {
        // Pet selection is required
        if (!petId || !Number.isInteger(Number(petId))) {
            throw new Error('Please select a valid pet.');
        }

        // Create appointment and validate the chosen pet
        const appointment = appointmentService.createAppointment(
            name,
            email,
            appointmentDate,
            location,
            notes,
            petId
        );

        // Find an existing Applicant or create a new one
        const applicant = applicationService.getOrCreateApplicant(
            name,
            email
        );

        // Connect the Appointment to the Applicant
        appointment.applicantId = applicant.applicantId;

        console.log(
            `Appointment #${appointment.appointmentId} created for ` +
            `${applicant.name} to visit Pet #${appointment.petId}`
        );

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Staff can confirm or cancel appointments
exports.changeAppointmentStatus = (req, res) => {
    const { appointmentId, status } = req.body;

    try {
        appointmentService.updateAppointmentStatus(
            appointmentId,
            status
        );

        res.redirect('/staff');
    } catch (error) {
        res.status(400).send(error.message);
    }
};