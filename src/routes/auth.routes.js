import { Router } from 'express';
import AuthController from '../controllers/authController.controller.js';
import authValidator from '../validators/auth.validator.js';
import validator from '../validators/result.validator.js';

export default class AuthRoutes {
  #router;

  #authController;

  constructor() {
    this.#router = Router();
    this.#initializeRoutes();
    this.#authController = new AuthController();
  }

  #initializeRoutes() {
    this.#router.post(
      '/login',
      authValidator(),
      validator,
      (req, res, next) => this.#authController.login(req, res, next),
    );
  }

  getRouter() {
    return this.#router;
  }
}
