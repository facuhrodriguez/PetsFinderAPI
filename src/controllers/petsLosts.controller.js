import PetsLostsService from '../services/petsLosts.service.js';

export default class PetsLostsController {
  #petsService;

  constructor() {
    this.#petsService = new PetsLostsService();
  }

  async findAll(req, res, next) {
    try {
      const pets = await this.#petsService.findAll();
      res.result = pets;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
