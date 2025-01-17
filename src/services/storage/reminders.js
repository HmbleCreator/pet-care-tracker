// src/services/storage/reminders.js

class ReminderStorage {
    static async create(reminder) {
      const id = crypto.randomUUID();
      reminder.id = id;
      const reminders = await this.getAll() || [];
      reminders.push(reminder);
      await chrome.storage.local.set({ reminders });
      return id;
    }
  
    static async update(id, updatedReminder) {
      const reminders = await this.getAll() || [];
      const reminderIndex = reminders.findIndex(reminder => reminder.id === id);
      if (reminderIndex !== -1) {
        reminders[reminderIndex] = updatedReminder;
        await chrome.storage.local.set({ reminders });
      }
    }
  
    static async delete(id) {
      let reminders = await this.getAll() || [];
      reminders = reminders.filter(reminder => reminder.id !== id);
      await chrome.storage.local.set({ reminders });
    }
  
    static async get(id) {
      const reminders = await this.getAll() || [];
      return reminders.find(reminder => reminder.id === id);
    }
  
    static async getAll() {
      const result = await chrome.storage.local.get(['reminders']);
      return result.reminders;
    }
  
    static async getByPet(petId) {
      const reminders = await this.getAll() || [];
      return reminders.filter(reminder => reminder.petId === petId);
    }
  
    static async markCompleted(id) {
      const reminder = await this.get(id);
      if (reminder) {
        reminder.status = 'completed';
        await this.update(id, reminder);
      }
    }
  
    static async snooze(id, minutes) {
      const reminder = await this.get(id);
      if (reminder) {
        reminder.datetime = new Date(new Date().getTime() + minutes * 60000);
        reminder.status = 'snoozed';
        await this.update(id, reminder);
      }
    }
  }
  