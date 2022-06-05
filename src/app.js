import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import os from 'os';
import compression from 'compression';
import helmet from 'helmet';

import DatabaseService from './config/database/db.js';
import IndexRoutes from './routes/index.routes.js';
import errorHandler from './middlewares/errorsHandler.middleware.js';
import StorageService from './config/storage/storageService.js';
import allowMimeType from './helpers/files.helper.js';
import { logger } from './config/config.js';

export default class App {
  #indexRouter;

  #tmpDir;

  /**
   * @type {multer.Multer}
   */
  #upload;

  #app;

  constructor() {
    this.#app = express();
    this.#app.use(express.json());
    this.#app.use(cors());
    this.#app.use(compression());
    this.#app.use(helmet());
    App.#initializeDatabase();
    App.#initializeStorage();
    this.#initializeMulter();
    this.#indexRouter = new IndexRoutes(this.#upload).getRouter();
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

  /**
   * Initialize storage
   */
  static #initializeStorage() {
    StorageService.initializeStorage();
  }

  /**
   * Initialize multer middleware
   */
  #initializeMulter() {
    try {
      this.#tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mascotapp-'));
      this.#upload = multer({ dest: this.#tmpDir, fileFilter: App.#validateFilesFormat });
    } catch (error) {
      logger.error(`Error initializing multer - ${JSON.stringify(error)}`);
      throw error;
    }
  }

  /**
   * Validat files format from the request
   * @param {Express.Request} req
   * @param {*} file
   * @param {*} cb
   */
  static #validateFilesFormat(req, file, cb) {
    try {
      if (file.mimetype && allowMimeType(file.mimetype)) {
        return cb(null, true);
      }
      return cb(null, false);
    } catch (error) {
      return cb(error);
    }
  }
}
