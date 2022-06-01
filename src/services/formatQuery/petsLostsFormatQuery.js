// @ts-check
import { logger } from '../../config/config.js';
import FormatQueryService from './formatQuery.service.js';

export default class PetsLostsFormatQuery extends FormatQueryService {
  /**
   * Format query for @param rawData
   * @param {import('firebase-admin').firestore.QueryDocumentSnapshot[]} rawData
   * @returns {import('../../view-models/pets.vm.js').Pets[]}
   */
  static formatQuery(rawData) {
    try {
      const prunnedData = [];
      rawData.forEach((value) => {
        /**
         * @type {import('../../view-models/pets.vm.js').Pets}
         */
        const valueToReturn = {};
        const valueData = value.data();
        valueToReturn.id = valueData.id;
        valueToReturn.name = valueData.name;
        valueToReturn.age = valueData.age;
        valueToReturn.castrated = valueData.castrated;
        valueToReturn.description = valueData.description;
        valueToReturn.photos = valueData.photos ? valueData.photos : [];

        if (valueData.createdAt) {
          valueToReturn.createdAt = new Date(valueData.createdAt.toDate());
        }
        if (valueData.lastView) {
          valueToReturn.lastView = new Date(valueData.lastView.toDate());
        }
        if (valueData.comments) {
          valueData.comments.map((comment) => {
            const auxComment = comment;
            auxComment.commentedAt = new Date(comment.commentedAt.toDate());
            return auxComment;
          });
          valueToReturn.comments = valueData.comments;
        }
        if (valueData.coordenates) {
          valueToReturn.coordenates = {
            latitude: valueData.coordenates.latitude,
            longitude: valueData.coordenates.longitude,
          };
        }

        prunnedData.push(valueToReturn);
      });
      return prunnedData;
    } catch (error) {
      logger.error(`Error formatting query data ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
