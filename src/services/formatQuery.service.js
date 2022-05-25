import { logger } from '../config/config.js';

export default class FormatQueryService {
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
