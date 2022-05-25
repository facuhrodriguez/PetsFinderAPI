import express from 'express';
import cors from 'cors';
import DatabaseService from './database/db.js';
import IndexRoutes from './routes/index.routes.js';
import errorHandler from './middlewares/errorsHandler.middleware.js';

export default class App {
  #indexRouter;

  #db;

  #app;

  constructor() {
    this.#app = express();
    this.#app.use(express.json());
    this.#app.use(cors());
    App.#initializeDatabase();
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
  }

  /**
   * Initialize database from firebase
   */
  static #initializeDatabase() {
    DatabaseService.initializeDatabase();
  }
}
