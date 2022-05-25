/* eslint-disable import/no-unresolved */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { logger } from '../config/config.js';

export default class DatabaseService {
  #db;

  /**
   * Get the database from Firebase
   * @returns {import('firebase-admin/firestore').Firestore} firebase client
   */
  static initializeDatabase() {
    try {
      logger.info('Initializating database...');
      initializeApp();
      logger.info('Database connected');
      return getFirestore();
    } catch (error) {
      logger.error(`Error initializating database ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Get the database from Firebase
   * @returns {import('firebase-admin/firestore').Firestore} firebase client
   */
  static getDatabase() {
    return getFirestore();
  }
}
