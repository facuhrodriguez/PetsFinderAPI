import PetsLostsService from '../services/petsLosts.service.js';

export default class PetsLostsController {
  #petsService;

  constructor() {
    this.#petsService = new PetsLostsService();
  }

  /**
   * Find all lost pets
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {import("express").NextFunction} next
   * @returns
   */
  async findAll(req, res, next) {
    try {
      const { type } = req.query;
      const pets = await this.#petsService.findAll(!type ? 'all' : type);
      res.result = pets;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Publish a new lost pet
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   * @returns
   */
  publishPet(req, res, next) {
    try {
      const { files: photos } = req;
      const {
        name, age, type: animal, description, castrated, extras, lastView,
      } = req.body;
      /**
       * @type {import('../view-models/pets.vm').Pets}
       */
      const petToPublish = {
        name,
        age: Number(age),
        animal,
        description,
        castrated: castrated.toUpperCase() === 'TRUE',
        extras,
        lastView: new Date(lastView),
        createdAt: new Date(),
        // coordenates,
      };
      this.#petsService.publishPet(petToPublish, photos);

      res.result = 'Success';
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
