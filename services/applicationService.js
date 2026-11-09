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

module.exports = {
    Applicant,
    AdoptionApplication,
    createApplication
};