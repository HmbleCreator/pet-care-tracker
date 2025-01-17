// src/services/storage/petProfiles.js

class PetProfileStorage {
    static async create(pet) {
      const id = crypto.randomUUID();
      pet.id = id;
      const pets = await this.getAll() || [];
      pets.push(pet);
      await chrome.storage.local.set({ pets });
      return id;
    }
  
    static async update(id, updatedPet) {
      const pets = await this.getAll() || [];
      const petIndex = pets.findIndex(pet => pet.id === id);
      if (petIndex !== -1) {
        pets[petIndex] = updatedPet;
        await chrome.storage.local.set({ pets });
      }
    }
  
    static async delete(id) {
      let pets = await this.getAll() || [];
      pets = pets.filter(pet => pet.id !== id);
      await chrome.storage.local.set({ pets });
    }
  
    static async get(id) {
      const pets = await this.getAll() || [];
      return pets.find(pet => pet.id === id);
    }
  
    static async getAll() {
      const result = await chrome.storage.local.get(['pets']);
      return result.pets;
    }
  
    static async addHealthCondition(petId, condition) {
      const pet = await this.get(petId);
      if (pet) {
        pet.healthConditions.push(condition);
        await this.update(petId, pet);
      }
    }
  
    static async updateWeight(petId, weight) {
      const pet = await this.get(petId);
      if (pet) {
        pet.weight.history.push({ date: new Date(), value: weight });
        pet.weight.value = weight;
        await this.update(petId, pet);
      }
    }
  }
  