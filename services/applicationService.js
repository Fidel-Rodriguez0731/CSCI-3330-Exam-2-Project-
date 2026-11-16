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

function getOrCreateApplicant(name, email, phone = '') {
    if (!name?.trim() || !email?.trim()) {
        throw new Error('Applicant name and email are required.');
    }

    const cleanEmail = email.trim().toLowerCase();

    // Reuse an existing applicant with the same email
    const existingApplicant = applicants.find(
        applicant => applicant.email.toLowerCase() === cleanEmail
    );

    if (existingApplicant) {
        // Save their phone number if they provide one later
        if (typeof phone === 'string' && phone.trim()) {
            existingApplicant.phone = phone.trim();
        }

        return existingApplicant;
    }

    // Create a new Applicant object
    const applicant = new Applicant(
        applicants.length + 1,
        name.trim(),
        cleanEmail,
        typeof phone === 'string' ? phone.trim() : ''
    );

    applicants.push(applicant);

    return applicant;
}

// Create a new adoption application
function createApplication(name, email, phone, petId) {
    const pet = petService.getAllPets().find(
        pet => pet.petId === Number(petId) && pet.status === 'Available'
    );

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !pet) {
        throw new Error('Please enter valid information and select an available pet.');
    }

   
    const applicant = getOrCreateApplicant(name, email, phone);


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
    updateApplicationStatus,
    getOrCreateApplicant
};