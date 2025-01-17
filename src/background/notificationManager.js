// src/background/notificationManager.js

class NotificationManager {
    static async show(options: {
      title: string;
      message: string;
      type: string;
      reminderId?: string;
      sound?: boolean;
    }): Promise<void> {
      chrome.notifications.create(options.reminderId, {
        type: 'basic',
        iconUrl: 'public/icons/icon48.png',
        title: options.title,
        message: options.message,
        priority: 2,
      });
  
      if (options.sound) {
        const sound = new Audio('public/assets/sounds/reminder.mp3');
        sound.play();
      }
    }
  
    static async clear(id: string): Promise<void> {
      chrome.notifications.clear(id);
    }
  
    static async handleClick(id: string): Promise<void> {
      const reminder = await ReminderStorage.get(id);
      reminder.status = 'completed';
      await ReminderStorage.update(id, reminder);
    }
  
    static async handleButtonClick(id: string, buttonIndex: number): Promise<void> {
      if (buttonIndex === 0) {
        // Complete reminder
        await this.handleClick(id);
      } else if (buttonIndex === 1) {
        // Snooze reminder
        const reminder = await ReminderStorage.get(id);
        const snoozeTime = 15; // Default snooze time in minutes
        reminder.datetime = new Date(new Date().getTime() + snoozeTime * 60000);
        reminder.status = 'snoozed';
        await ReminderStorage.update(id, reminder);
      }
    }
  }
  