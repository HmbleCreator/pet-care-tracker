// src/models/Reminder.js

interface Reminder {
    id: string;               // UUID
    petId: string;            // Reference to Pet
    type: 'medication' | 'vaccination' | 'appointment' | 'grooming' | 'custom';
    title: string;
    description: string;
    datetime: Date;
    recurring: boolean;
    frequency?: {
      type: 'daily' | 'weekly' | 'monthly' | 'yearly';
      interval: number;      // Every X days/weeks/etc.
      endDate?: Date;
    };
    lastCompleted?: Date;
    status: 'pending' | 'completed' | 'missed' | 'snoozed';
    notifications: {
      enabled: boolean;
      advance: number;       // Minutes before reminder
      sound: boolean;
    };
  }
  
  export default Reminder;
  