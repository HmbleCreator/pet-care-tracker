// src/background/background.js

class BackgroundService {
    private reminderSystem: ReminderSystem;
    private notificationManager: NotificationManager;
  
    constructor() {
      this.init();
      this.setupEventListeners();
    }
  
    private async init(): Promise<void> {
      this.reminderSystem = new ReminderSystem();
      this.notificationManager = new NotificationManager();
    }
  
    private setupEventListeners(): void {
      chrome.runtime.onInstalled.addListener(this.handleInstall.bind(this));
      chrome.runtime.onUpdateAvailable.addListener(this.handleUpdate.bind(this));
    }
  
    private handleInstall(details: chrome.runtime.InstalledDetails): void {
      if (details.reason === 'install') {
        // Handle new install logic
      }
    }
  
    private handleUpdate(details: chrome.runtime.InstalledDetails): void {
      if (details.reason === 'update') {
        // Handle update logic
      }
    }
  }
  
  new BackgroundService();
  