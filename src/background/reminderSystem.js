// src/background/reminderSystem.js

class ReminderSystem {
    private checkInterval: number = 60000; // 1 minute
  
    constructor() {
      this.init();
      this.startChecking();
    }
  
    private async init(): Promise<void> {
      // Initialize reminder data
    }
  
    private async startChecking(): Promise<void> {
      setInterval(async () => {
        await this.checkReminders();
      }, this.checkInterval);
    }
  
    private async checkReminders(): Promise<void> {
      const reminders = await ReminderStorage.getAll();
      const now = new Date();
  
      reminders.forEach((reminder) => {
        if (new Date(reminder.datetime) <= now && reminder.status === 'pending') {
          this.triggerReminder(reminder);
        }
      });
    }
  
    private triggerReminder(reminder: Reminder): void {
      NotificationManager.show({
        title: reminder.title,
        message: reminder.description,
        type: reminder.type,
        reminderId: reminder.id,
        sound: reminder.notifications.sound,
      });
  
      reminder.status = 'completed';
      ReminderStorage.update(reminder.id, reminder);
    }
  
    public async addReminder(reminder: Reminder): Promise<void> {
      await ReminderStorage.create(reminder);
    }
  
    public async removeReminder(id: string): Promise<void> {
      await ReminderStorage.delete(id);
    }
  
    public async snoozeReminder(id: string, minutes: number): Promise<void> {
      const reminder = await ReminderStorage.get(id);
      reminder.datetime = new Date(new Date().getTime() + minutes * 60000);
      reminder.status = 'snoozed';
      await ReminderStorage.update(id, reminder);
    }
  }
  