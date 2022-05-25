import { Router } from 'express';
import PetsLostsController from '../controllers/petsLosts.controller.js';

export default class PetsRoutes {
  #router;

  #petLostsController;

  constructor() {
    this.#router = Router();
    this.#petLostsController = new PetsLostsController();
    this.#initializeRoutes();
  }

  #initializeRoutes() {
    this.#router.get('/losts', PetsLostsController.findAll);
  }

  getRouter() {
    return this.#router;
  }
}
