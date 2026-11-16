const PET_PHOTOS = {
    1: "https://images.unsplash.com/photo-1693615775129-f2004d6e3e0b?auto=format&fit=crop&w=900&q=82",
    2: "https://images.unsplash.com/photo-1655059396628-5306eb937e6f?auto=format&fit=crop&w=900&q=82",
    7: "https://images.unsplash.com/photo-1582725461742-8ecd962c260d?auto=format&fit=crop&w=900&q=82",
    3: "https://images.unsplash.com/photo-1750007615060-55d4e0002900?auto=format&fit=crop&w=900&q=82",
    4: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?auto=format&fit=crop&w=900&q=82",
    8: "https://images.unsplash.com/photo-1652488634212-aa26e36f3b75?auto=format&fit=crop&w=900&q=82",
    5: "https://images.unsplash.com/photo-1757800089126-dc9f5f8f2ea6?auto=format&fit=crop&w=900&q=82",
    6: "https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?auto=format&fit=crop&w=900&q=82",
    9: "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?auto=format&fit=crop&w=900&q=82",
};

class Pet {
    constructor(petId, name, type, breed, age, status, location) {
        this.petId = petId;
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.status = status;
        this.location = location;
        this.image = PET_PHOTOS[petId];
    }
}
const pets = [
    // Mission Branch
    new Pet(
        1,
        "Max",
        "Dog",
        "Golden Retriever",
        2,
        "Available",
        "Mission Branch",
    ),
    new Pet(
        2,
        "Rocky",
        "Dog",
        "German Shepherd",
        3,
        "Available",
        "Mission Branch",
    ),
    new Pet(7, "Cleo", "Cat", "Calico", 2, "Available", "Mission Branch"),
    // Edinburg Branch
    new Pet(3, "Luna", "Cat", "Tabby", 1, "Available", "Edinburg Branch"),
    new Pet(4, "Oliver", "Cat", "Siamese", 2, "Available", "Edinburg Branch"),
    new Pet(8, "Milo", "Dog", "Poodle", 1, "Available", "Edinburg Branch"),
    // McAllen Branch
    new Pet(5, "Bella", "Dog", "Beagle", 3, "Available", "McAllen Branch"),
    new Pet(6, "Charlie", "Dog", "Boxer", 4, "Available", "McAllen Branch"),
    new Pet(9, "Simba", "Cat", "Persian", 3, "Available", "McAllen Branch"),
];
function getAllPets() {
    return pets;
}
function getPetsByType(type) {
    if (!type || type === "All") return pets;
    return pets.filter((pet) => pet.type === type);
}
function getFilteredPets(type, location) {
    let result = pets;
    if (type && type !== "All")
        result = result.filter((pet) => pet.type === type);
    if (location)
        result = result.filter(
            (pet) => pet.location.toLowerCase() === location.toLowerCase(),
        );
    return result;
}
module.exports = { Pet, getAllPets, getPetsByType, getFilteredPets };