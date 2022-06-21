export default class FormatQueryService {
  /**
   * Format query for @param rawData
   * @param {import('firebase-admin').firestore.QueryDocumentSnapshot[]} rawData
   */
  static formatQuery(rawData) {
    const prunnedData = [];
    rawData.forEach((value) => {
      prunnedData.push(value.data());
    });
    return prunnedData;
  }
}
