import { logger } from '../../config/config.js';

export default class FormatQueryService {
  /**
   * Format query for @param rawData
   * @param {import('firebase-admin').firestore.QueryDocumentSnapshot[]} rawData
   */
  static formatQuery(rawData) {
    try {
      const prunnedData = [];
      rawData.forEach((value) => {
        prunnedData.push(value.data());
      });
      return prunnedData;
    } catch (error) {
      logger.error(`Error formatting query data ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
