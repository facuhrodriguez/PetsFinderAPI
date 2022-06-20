import { Router } from 'express';
import PetsLostsController from '../controllers/petsLosts.controller.js';
import { publishPetLostValidator, petsLostFindAllValidator } from '../validators/pets.validator.js';
import validator from '../validators/result.validator.js';

export default class PetsRoutes {
  #router;

  #petsLostController;

  #fileMiddleware;

  /**
   * Create new instance of Index Routes
   * @param {import('multer').Multer} fileMiddleware
   */
  constructor(fileMiddleware) {
    this.#router = Router();
    this.#fileMiddleware = fileMiddleware;
    this.#initializeRoutes();
    this.#petsLostController = new PetsLostsController();
  }

  /**
   * Initialize all routes for pets module
   */
  #initializeRoutes() {
    this.#router.get('/losts', petsLostFindAllValidator(), validator, (req, res, next) => {
      this.#petsLostController.findAll(req, res, next);
    });
    this.#router.post(
      '/losts',
      this.#fileMiddleware.array('photos', 5),
      publishPetLostValidator(),
      validator,
      (req, res, next) => {
        this.#petsLostController.publishPet(req, res, next);
      },
    );
  }

  /**
   * Get the router instance
   * @returns {Router}
   */
  getRouter() {
    return this.#router;
  }
}
