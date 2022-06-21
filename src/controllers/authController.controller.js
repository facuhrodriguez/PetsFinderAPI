import AuthService from '../services/auth.service.js';

export default class AuthController {
  #authService;

  constructor() {
    this.#authService = new AuthService();
  }

  /**
   * Login into MascotAPP
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {import("express").NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { name, email } = req.body.userInfo;
      await this.#authService.login(name, email);
      res.result = 'Success';
      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Login into MascotAPP using Facebook OAuth
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {import("express").NextFunction} next
   */
  async loginFacebook(req, res, next) {
    try {
      const { code } = req.query;
      await this.#authService.loginFacebook(code);
      res.result = 'Success';
      return next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get the Facebook OAuth URL
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {import("express").NextFunction} next
   */
  static getFacebookOauthUrl(req, res, next) {
    try {
      const facebookOAuthURL = AuthService.getFacebookOAuthUrl();
      res.result = facebookOAuthURL;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
