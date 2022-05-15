import express from 'express';
import cors from 'cors';

export default class App {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  getApp() {
    return this.app;
  }
}
