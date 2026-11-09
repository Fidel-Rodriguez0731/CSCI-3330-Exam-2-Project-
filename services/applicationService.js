const petService = require('./petService');

// Represents a person applying to adopt a pet
class Applicant {
    constructor(applicantId, name, email, phone) {
        this.applicantId = applicantId;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// Represents an adoption application
class AdoptionApplication {
    constructor(applicationId, applicantId, petId, status) {
        this.applicationId = applicationId;
        this.applicantId = applicantId;
        this.petId = petId;
        this.status = status;
    }
}

// Store applicants and applications
const applicants = [];
const applications = [];

// Create a new adoption application
function createApplication(name, email, phone, petId) {
    const pet = petService.getAllPets().find(
        pet => pet.petId === Number(petId) && pet.status === 'Available'
    );

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !pet) {
        throw new Error('Please enter valid information and select an available pet.');
    }

    const applicant = new Applicant(
        applicants.length + 1,
        name.trim(),
        email.trim(),
        phone.trim()
    );

    applicants.push(applicant);

    const application = new AdoptionApplication(
        applications.length + 1,
        applicant.applicantId,
        pet.petId,
        'Pending'
    );

    applications.push(application);

    return application;
}

function getAllApplications() {
    return applications.map(application => {
        const applicant = applicants.find(
            a => a.applicantId === application.applicantId
        );

        const pet = petService.getAllPets().find(
            p => p.petId === application.petId
        );

        return {
            ...application,
            applicantName: applicant.name,
            applicantEmail: applicant.email,
            petName: pet.name
        };
    });
}


function updateApplicationStatus(applicationId, newStatus) {
    // Find the application using its ID
    const application = applications.find(
        app => app.applicationId === Number(applicationId)
    );

    // Check if the application exists
    if (!application) {
        throw new Error('Application not found.');
    }

    // Only allow valid statuses
    if (newStatus !== 'Approved' && newStatus !== 'Rejected') {
        throw new Error('Invalid application status.');
    }

    // Update the application
    application.status = newStatus;

    return application;
}

module.exports = {
    Applicant,
    AdoptionApplication,
    createApplication,
    getAllApplications,
    updateApplicationStatus
};