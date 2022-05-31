import express from 'express';
import cors from 'cors';
import DatabaseService from './config/database/db.js';
import IndexRoutes from './routes/index.routes.js';
import errorHandler from './middlewares/errorsHandler.middleware.js';
import StorageService from './config/storage/storageService.js';

export default class App {
  #indexRouter;

  #app;

  constructor() {
    this.#app = express();
    this.#app.use(express.json());
    this.#app.use(cors());
    App.#initializeDatabase();
    App.#initializeStorage();
    this.#indexRouter = new IndexRoutes().getRouter();
    this.#initializeRoutes();
    this.#app.use(errorHandler);
  }

  /**
   * Get the express application
   * @returns {import('express').Application} Express application
   */
  getApp() {
    return this.#app;
  }

  /**
   * Initialize all application routes
   */
  #initializeRoutes() {
    this.#app.use('/api', this.#indexRouter);
    this.#app.get('*', (req, res) => {
      res.redirect('/api');
    });
  }

  /**
   * Initialize database from firebase
   */
  static #initializeDatabase() {
    DatabaseService.initializeDatabase();
  }

  static #initializeStorage() {
    const storageService = new StorageService();
    storageService.initializeStorage();
  }
}
