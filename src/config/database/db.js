/* eslint-disable import/no-unresolved */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config, logger } from '../config.js';

export default class DatabaseService {
  /**
   * Get the database from Firebase
   * @returns {import('firebase-admin/firestore').Firestore} firebase client
   */
  static initializeDatabase() {
    try {
      const serviceAccount = config.FIREBASE.google_creds;
      logger.info('Initializating database...');
      initializeApp({
        credential: cert(serviceAccount),
      });
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
