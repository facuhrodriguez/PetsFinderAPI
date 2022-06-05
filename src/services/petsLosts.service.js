import { config, logger } from '../config/config.js';
import DatabaseService from '../config/database/db.js';
import StorageService from '../config/storage/storageService.js';
import getUID from '../helpers/uid.helper.js';
import PetsLostsFormatQuery from './formatQuery/petsLostsFormatQuery.js';

export default class PetsLostsService {
  #db;

  #petsLostRef;

  #storage;

  constructor() {
    this.#db = DatabaseService.getDatabase();
    this.#storage = StorageService.getStorage();
    this.#petsLostRef = this.#db.collection('pets_losts');
  }

  /**
   * Find all pets losts
   * @returns {Promise<import('../view-models/pets.vm.js').Pets[]>} pets losts
   */
  async findAll() {
    try {
      const petsLosts = await this.#petsLostRef.get();
      if (!petsLosts.empty) {
        return PetsLostsFormatQuery.formatQuery(petsLosts.docs);
      }
      return [];
    } catch (error) {
      logger.error(`Error getting all pets - ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Publish a new Pet lost
   * @param {import('../view-models/pets.vm.js').Pets} petLost
   * @param {import('../view-models/files.vm.js').File[]} photos
   */
  async publishPet(petLost, photos) {
    try {
      const newPet = await this.#petsLostRef.add(petLost);
      const photosUrl = [];
      if (photos && photos.length) {
        for (let i = 0; i < photos.length; i += 1) {
          photosUrl.push(this.#uploadPhoto(photos[i].path, newPet.id, photos[i].mimetype));
        }
      }
      const photosToAdd = await Promise.all(photosUrl);
      await this.#petsLostRef.doc(newPet.id).update({ photos: photosToAdd });
    } catch (error) {
      logger.error(`Error publishing new pet - ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Upload photo into bucket
   * @param {string} photoPath path of photo
   * @param {string} id id of new pet
   * @param {string} contentType file contentType
   */
  async #uploadPhoto(photoPath, id, contentType) {
    try {
      const uid = getUID();
      const [file] = await this.#storage.upload(photoPath, { contentType, destination: `pets/losts/${id}/images/${uid}` });
      return `gs://${config.FIREBASE.storageBucket}/${file.name}`;
    } catch (error) {
      logger.error(`Error uploading photos - ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
