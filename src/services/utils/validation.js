// src/services/utils/validation.js

class ValidationUtils {
    static validatePet(pet) {
      const errors = [];
      if (!pet.name) errors.push('Name is required.');
      if (!pet.species) errors.push('Species is required.');
      if (!pet.birthDate) errors.push('Birth date is required.');
      if (!pet.weight || pet.weight.value <= 0) errors.push('Weight must be greater than 0.');
      return errors;
    }
  
    static validateReminder(reminder) {
      const errors = [];
      if (!reminder.petId) errors.push('Pet ID is required.');
      if (!reminder.title) errors.push('Title is required.');
      if (!reminder.datetime) errors.push('Date and time are required.');
      return errors;
    }
  
    static validateHealthRecord(record) {
      const errors = [];
      if (!record.petId) errors.push('Pet ID is required.');
      if (!record.type) errors.push('Type is required.');
      if (!record.date) errors.push('Date is required.');
      if (!record.details || !record.details.title) errors.push('Title is required.');
      return errors;
    }
  
    static getValidationErrors(object, type) {
      switch (type) {
        case 'pet':
          return this.validatePet(object);
        case 'reminder':
          return this.validateReminder(object);
        case 'healthRecord':
          return this.validateHealthRecord(object);
        default:
          throw new Error('Invalid type for validation');
      }
    }
  }
  