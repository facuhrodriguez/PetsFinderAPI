import axios from 'axios';
import * as queryString from 'query-string';
import { config, logger } from '../config/config.js';
import DatabaseService from '../config/database/db.js';

export default class AuthService {
  #db;

  #usersRef;

  constructor() {
    this.#db = DatabaseService.getDatabase();
    this.#usersRef = this.#db.collection('users');
  }

  /**
   * Login user into MascotAPP. If the user already exist, it will be updated
   * @param {string} name name of user
   * @param {email} email email of user
   */
  async login(name, email) {
    try {
      const user = await this.#usersRef.doc(email).get();
      if (!user.data()) {
        await this.#usersRef.doc(email).set({
          name,
          email,
        });
      } else {
        await this.#usersRef.doc(email).update({ name });
      }
    } catch (error) {
      logger.error(`Error logging - ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Login user using facebook OAuth. If the user already exist in the DB then it will be updated
   * @param {string} code facebookCode
   */
  async loginFacebook(code) {
    try {
      const credentials = await AuthService.getAccessToken(code);
      const userFacebookData = await AuthService.getFacebookUserInfo(
        credentials.access_token,
      );
      const facebookInfo = {
        accessToken: credentials.access_token,
        ...userFacebookData,
      };
      if (userFacebookData && userFacebookData.email) {
        const { email, name } = userFacebookData;
        const userDB = await this.#usersRef.doc(email).get();
        if (userDB.data()) {
          await this.#usersRef
            .doc(email)
            .update({ facebookInfo });
        } else {
          await this.#usersRef.doc(email).set({
            name,
            email,
            facebookInfo,
          });
        }
      }
    } catch (error) {
      logger.error(
        `Error logging with facebook - ${JSON.stringify(error)}`,
      );
      throw new Error('Internal error server');
    }
  }

  /**
   * Get the OAuth URL for facebook login
   * @returns {string}
   */
  static getFacebookOAuthUrl() {
    try {
      const stringifiedParams = queryString.stringify({
        client_id: config.FACEBOOK.client_id,
        redirect_uri: config.FACEBOOK.redirect_uri,
        scope: config.FACEBOOK.scopes.join(','),
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
      });

      return `${config.FACEBOOK.oauthUrl}?${stringifiedParams}`;
    } catch (error) {
      logger.error(
        `Error getting facebook OAuth URL - ${JSON.stringify(error)}`,
      );
      throw new Error('Internal error server');
    }
  }

  /**
   * Get credentials for Facebook OAuth
   * @param {string} code authorization code
   * @returns {Promise<{
   *  access_token: string, token_type: string, expires_in: number, auth_type: string}
   * }
  */
  static async getAccessToken(code) {
    const facebookData = await axios({
      url: `${config.FACEBOOK.tokenUrl}?client_id=${config.FACEBOOK.client_id}&client_secret=${config.FACEBOOK.secret}&redirect_uri=${config.FACEBOOK.redirect_uri}&code=${code}`,
      method: 'get',
    });
    if (facebookData.status === 200) {
      return facebookData.data;
    }
    throw facebookData.data;
  }

  /**
   * Get credentials for Facebook OAuth
   * @param {string} accessToken authorization code
   * @returns {Promise<{name: string, id: string, email: string, picture: any}}
   */
  static async getFacebookUserInfo(accessToken) {
    const facebookData = await axios({
      url: `${config.FACEBOOK.graphAPI}me?access_token=${accessToken}&fields=id,name,email,picture`,
      method: 'get',
    });
    if (facebookData.status === 200) {
      return facebookData.data;
    }
    throw facebookData.data;
  }
}
