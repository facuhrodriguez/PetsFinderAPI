import { Router } from 'express';
import resultHandler from '../middlewares/results.middleware.js';
import AuthRoutes from './auth.routes.js';
import PetsRoutes from './pets.routes.js';

export default class IndexRoutes {
  #router;

  #petsRouter;

  #authRouter;

  /**
   * @type {import('multer').Multer} fileMiddleware
   */
  #fileMiddleware;

  /**
   * Create new instance of Index Routes
   * @param {import('multer').Multer} fileMiddleware
   */
  constructor(fileMiddleware) {
    this.#router = Router();
    this.#fileMiddleware = fileMiddleware;
    this.#petsRouter = new PetsRoutes(this.#fileMiddleware).getRouter();
    this.#authRouter = new AuthRoutes().getRouter();
    this.#initializeRoutes();
    this.#router.use(resultHandler);
  }

  #initializeRoutes() {
    this.#router.use('/pets', this.#petsRouter);
    this.#router.use('/auth', this.#authRouter);
    this.#router.get('', (req, res) => res.status(200).json('MascotApp API'));
  }

  getRouter() {
    return this.#router;
  }
}
