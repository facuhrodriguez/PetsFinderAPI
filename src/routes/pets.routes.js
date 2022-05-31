import { Router } from 'express';
import PetsLostsController from '../controllers/petsLosts.controller.js';

export default class PetsRoutes {
  #router;

  #petsLostController;

  constructor() {
    this.#router = Router();
    this.#initializeRoutes();
    this.#petsLostController = new PetsLostsController();
  }

  #initializeRoutes() {
    this.#router.get('/losts', (req, res, next) => this.#petsLostController.findAll(req, res, next));
  }

  getRouter() {
    return this.#router;
  }
}
