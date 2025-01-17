// src/services/utils/dateUtils.js

class DateUtils {
    static formatDate(date, format = 'YYYY-MM-DD') {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('en-CA', options);
    }
  
    static calculateNextDue(base, frequency) {
      const nextDue = new Date(base);
      switch (frequency.type) {
        case 'daily':
          nextDue.setDate(nextDue.getDate() + frequency.interval);
          break;
        case 'weekly':
          nextDue.setDate(nextDue.getDate() + frequency.interval * 7);
          break;
        case 'monthly':
          nextDue.setMonth(nextDue.getMonth() + frequency.interval);
          break;
        case 'yearly':
          nextDue.setFullYear(nextDue.getFullYear() + frequency.interval);
          break;
        default:
          throw new Error('Invalid frequency type');
      }
      return nextDue;
    }
  
    static isOverdue(dueDate) {
      return new Date(dueDate) < new Date();
    }
  
    static getRelativeTimeString(date) {
      const now = new Date();
      const diffMs = now - new Date(date);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays > 1) {
        return `${diffDays} days ago`;
      } else {
        return 'In the future';
      }
    }
  }
  