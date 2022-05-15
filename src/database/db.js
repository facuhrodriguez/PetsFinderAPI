/* eslint-disable import/no-unresolved */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { logger } from '../config/config.js';

export default class DatabaseService {
  constructor() {
    try {
      logger.info('Initializating database...');
      initializeApp();
      this.db = getFirestore();
      logger.info('Database connected');
    } catch (error) {
      logger.error(`Error initializating database ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Get the database from Firebase
   * @returns {import('firebase-admin/firestore')} firebase client
   */
  getDatabase() {
    return this.db;
  }
}
