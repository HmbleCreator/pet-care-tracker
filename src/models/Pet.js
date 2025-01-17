// src/models/Pet.js

interface Pet {
    id: string;               // UUID
    name: string;             // Pet name
    species: string;          // Dog/Cat/etc.
    breed: string;            // Specific breed
    birthDate: Date;          // Birth date
    weight: {
      value: number;
      unit: 'kg' | 'lbs';    // Weight unit
      history: Array<{
        date: Date;
        value: number;
      }>;
    };
    photos: {
      primary: string;        // Base64 or URL
      gallery: string[];      // Array of Base64 or URLs
    };
    healthConditions: Array<{
      condition: string;
      diagnosedDate: Date;
      notes: string;
    }>;
    medications: Array<{
      id: string;
      name: string;
      dosage: string;
      frequency: string;
      startDate: Date;
      endDate?: Date;
      notes: string;
    }>;
    vaccinations: Array<{
      id: string;
      name: string;
      dateAdministered: Date;
      nextDueDate: Date;
      provider: string;
    }>;
  }
  
  export default Pet;
  