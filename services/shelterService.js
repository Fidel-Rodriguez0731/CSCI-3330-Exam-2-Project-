const petService = require('./petService');

class Shelter {
    constructor(shelterId, name, location, availablePets) {
        this.shelterId = shelterId;
        this.name = name;
        this.location = location;
        this.availablePets = availablePets;
    }
}

// Create shelter objects for the three branches.
// Match each branch with its available pets.
const shelters = [
    new Shelter(
        1,
        'Mission Branch',
        'Mission, TX',
        petService.getAllPets().filter(pet =>
            pet.location === 'Mission Branch' &&
            pet.status === 'Available'
        )
    ),
    new Shelter(
        2,
        'Edinburg Branch',
        'Edinburg, TX',
        petService.getAllPets().filter(pet =>
            pet.location === 'Edinburg Branch' &&
            pet.status === 'Available'
        )
    ),
    new Shelter(
        3,
        'McAllen Branch',
        'McAllen, TX',
        petService.getAllPets().filter(pet =>
            pet.location === 'McAllen Branch' &&
            pet.status === 'Available'
        )
    )
];

function getAllShelters() {
    return shelters;
}

module.exports = {
    Shelter,
    getAllShelters
};