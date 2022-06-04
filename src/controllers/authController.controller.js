import { logger } from '../config/config.js';
import AuthService from '../services/auth.service.js';

export default class AuthController {
  #authService;

  constructor() {
    this.#authService = new AuthService();
  }

  async login(req, res, next) {
    try {
      const { name, email } = req.body.userInfo;
      await this.#authService.login(name, email);
      res.result = 'Success';
      return next();
    } catch (error) {
      logger.error(`Error login in auth controller - ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
