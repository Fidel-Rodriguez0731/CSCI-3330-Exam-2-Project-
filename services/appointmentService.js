const petService = require('./petService');

// Appointment object
class Appointment {
    constructor(
        appointmentId,
        name,
        email,
        appointmentDate,
        location,
        notes,
        petId = null,
        applicantId = null
    ) {
        this.appointmentId = appointmentId;
        this.name = name;
        this.email = email;
        this.appointmentDate = appointmentDate;
        this.location = location;
        this.notes = notes;
        this.petId = petId;
        this.applicantId = applicantId;
        this.status = 'Pending';
    }
}

// Store appointments temporarily in memory
const appointments = [];

// Create a new appointment
function createAppointment(
    name,
    email,
    appointmentDate,
    location,
    notes,
    petId = null,
    applicantId = null
) {
    // Validate required information
    if (
        !name?.trim() ||
        !email?.trim() ||
        !appointmentDate ||
        !location?.trim()
    ) {
        throw new Error(
            'Please complete all required appointment fields.'
        );
    }

    // Validate the pet if one was selected
    if (petId !== null && petId !== undefined) {
        const pet = petService.getAllPets().find(
            p => p.petId === Number(petId)
        );

        if (!pet) {
            throw new Error('Selected pet does not exist.');
        }

        if (pet.status !== 'Available') {
            throw new Error('Selected pet is not available.');
        }

        if (pet.location !== location) {
            throw new Error(
                'Selected pet does not belong to this shelter.'
            );
        }
    }

    // Create appointment object
    const appointment = new Appointment(
        appointments.length + 1,
        name.trim(),
        email.trim(),
        appointmentDate,
        location.trim(),
        typeof notes === 'string' ? notes.trim() : '',
        petId === null || petId === undefined
            ? null
            : Number(petId),
        applicantId
    );

    appointments.push(appointment);

    return appointment;
}

// Retrieve all appointments
function getAllAppointments() {
    return appointments;
}

// Update appointment status
function updateAppointmentStatus(appointmentId, newStatus) {
    const appointment = appointments.find(
        app => app.appointmentId === Number(appointmentId)
    );

    if (!appointment) {
        throw new Error('Appointment not found.');
    }

    if (
        newStatus !== 'Confirmed' &&
        newStatus !== 'Cancelled'
    ) {
        throw new Error('Invalid appointment status.');
    }

    appointment.status = newStatus;

    return appointment;
}

module.exports = {
    Appointment,
    createAppointment,
    getAllAppointments,
    updateAppointmentStatus
};