import express from 'express';
import cors from 'cors';
import DatabaseService from './database/db.js';

export default class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.#initializeDatabase();
  }

  /**
   * Initialize database from firebase
   */
  #initializeDatabase() {
    const databaseService = new DatabaseService();
    this.db = databaseService.getDatabase();
  }

  /**
   * Get the express application
   * @returns {import('express').Application} Express application
   */
  getApp() {
    return this.app;
  }
}
