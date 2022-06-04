import { logger } from '../config/config.js';
import DatabaseService from '../config/database/db.js';

export default class AuthService {
  #db;

  #usersRef;

  constructor() {
    this.#db = DatabaseService.getDatabase();
    this.#usersRef = this.#db.collection('users');
  }

  async login(name, email) {
    try {
      const user = await this.#usersRef.doc(email).get();
      if (!user.data()) {
        await this.#usersRef.doc(email).set({
          name,
          email,
        });
      } else {
        await this.#usersRef.doc(email).update({ name });
      }
    } catch (error) {
      logger.error(`Error logging - ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
