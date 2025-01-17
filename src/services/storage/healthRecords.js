// src/services/storage/healthRecords.js

class HealthRecordStorage {
    static async create(record) {
      const id = crypto.randomUUID();
      record.id = id;
      const records = await this.getAll() || [];
      records.push(record);
      await chrome.storage.local.set({ records });
      return id;
    }
  
    static async update(id, updatedRecord) {
      const records = await this.getAll() || [];
      const recordIndex = records.findIndex(record => record.id === id);
      if (recordIndex !== -1) {
        records[recordIndex] = updatedRecord;
        await chrome.storage.local.set({ records });
      }
    }
  
    static async delete(id) {
      let records = await this.getAll() || [];
      records = records.filter(record => record.id !== id);
      await chrome.storage.local.set({ records });
    }
  
    static async get(id) {
      const records = await this.getAll() || [];
      return records.find(record => record.id === id);
    }
  
    static async getAll() {
      const result = await chrome.storage.local.get(['records']);
      return result.records;
    }
  
    static async getByPet(petId) {
      const records = await this.getAll() || [];
      return records.filter(record => record.petId === petId);
    }
  }
  