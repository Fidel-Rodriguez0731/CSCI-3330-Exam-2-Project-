class Pet {
    constructor(petId, name, type, breed, age, status, location) {
        this.petId = petId;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.status = status;
        this.location = location;
    }
}

const pets = [
    // Mission Branch
    new Pet(1, "Max", "Dog", "Golden Retriever", 2, "Available", "Mission Branch"),
    new Pet(2, "Rocky", "Dog", "German Shepherd", 3, "Available", "Mission Branch"),
    new Pet(7, "Cleo", "Cat", "Calico", 2, "Available", "Mission Branch"),

    // Edinburg Branch
    new Pet(3, "Luna", "Cat", "Tabby", 1, "Available", "Edinburg Branch"),
    new Pet(4, "Oliver", "Cat", "Siamese", 2, "Available", "Edinburg Branch"),
    new Pet(8, "Milo", "Dog", "Poodle", 1, "Available", "Edinburg Branch"),

    // McAllen Branch
    new Pet(5, "Bella", "Dog", "Beagle", 3, "Available", "McAllen Branch"),
    new Pet(6, "Charlie", "Dog", "Boxer", 4, "Available", "McAllen Branch"),
    new Pet(9, "Simba", "Cat", "Persian", 3, "Available", "McAllen Branch")
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

function getFilteredPets(type, location) {
    let result = pets;

    if (type && type !== 'All') {
        result = result.filter(pet => pet.type === type);
    }

    if (location) {
        result = result.filter(pet => pet.location.toLowerCase() === location.toLowerCase());
    }

    return result;
}

module.exports = { Pet, getAllPets, getPetsByType, getFilteredPets };