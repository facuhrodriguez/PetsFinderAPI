import { Storage } from '@google-cloud/storage';
import { logger, config } from '../config.js';

export default class StorageService {
  #bucket;

  /**
     * Initialize firestore
     */
  initializeStorage() {
    try {
      logger.info('Initializating Storage...');
      const storage = new Storage();
      this.#bucket = storage.bucket(config.FIREBASE.storageBucket);
      logger.info('Storage connected');
    } catch (error) {
      logger.error(
        `Error initializating storage ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  /**
   * Get the storage client from Firestore
   * @returns {import('@google-cloud/storage').Storage} Storage client
   */
  getStorage() {
    return this.#bucket;
  }
}
