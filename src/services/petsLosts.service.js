import { logger } from '../config/config.js';
import DatabaseService from '../config/database/db.js';
import PetsLostsFormatQuery from './formatQuery/petsLostsFormatQuery.js';

export default class PetsLostsService {
  #db;

  #petsLostRef;

  constructor() {
    this.#db = DatabaseService.getDatabase();
    this.#petsLostRef = this.#db.collection('pets_losts');
  }

  async findAll() {
    try {
      const petsLosts = await this.#petsLostRef.get();
      if (!petsLosts.empty) {
        return PetsLostsFormatQuery.formatQuery(petsLosts.docs);
      }
      return [];
    } catch (error) {
      logger.error(`Error getting all pets - ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
