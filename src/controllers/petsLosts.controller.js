import PetsLostsService from '../services/petsLosts.service.js';

export default class PetsLostsController {
  static #petsService;

  constructor() {
    PetsLostsController.#petsService = new PetsLostsService();
  }

  static async findAll(req, res, next) {
    try {
      const pets = await PetsLostsController.#petsService.findAll();
      res.result = pets;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
