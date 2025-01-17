// src/models/HealthRecord.js

interface HealthRecord {
    id: string;               // UUID
    petId: string;            // Reference to Pet
    type: 'checkup' | 'vaccination' | 'medication' | 'procedure' | 'test';
    date: Date;
    provider: {
      name: string;
      clinic: string;
      contact: string;
    };
    details: {
      title: string;
      description: string;
      findings?: string;
      recommendations?: string;
      nextVisitDate?: Date;
    };
    attachments: Array<{
      id: string;
      type: string;
      data: string;         // Base64 encoded
    }>;
    cost?: {
      amount: number;
      currency: string;
    };
  }
  
  export default HealthRecord;
  