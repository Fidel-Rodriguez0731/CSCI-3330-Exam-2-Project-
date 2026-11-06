class Pet {
    constructor(petId, name, type, breed, age, status) {
        this.petId = petId;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.status = status;
    }
}

const pets = [
    new Pet(1, "Max", "Dog", "Golden Retriever", 2, "Available"),
    new Pet(2, "Luna", "Cat", "Tabby", 1, "Available"),
    new Pet(3, "Bella", "Dog", "Beagle", 3, "Available")
];

function getAllPets() {
    return pets;
}


function getPetsByType(type) {
    if (!type || type === 'All') {
        return pets;
    }

    return pets.filter(pet => pet.type === type);
}

module.exports = { Pet, getAllPets, getPetsByType };