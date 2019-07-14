import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import router from './router';
import db from './database/db';
import { errorResponse, validator } from './middlewares';

export default class Server {
  constructor() {
    this.app = express();
    this.middleware();
    this.initializeDb();
  }

  initializeDb() {
    db.connect();
  }

  middleware() {
    const { app } = this;
    app.use(cors());
    app.use(express.json());
    app.use(validator);
    app.use(router);
    app.use(errorResponse);
  }

  listen(port) {
    const { app } = this;
    app.listen(port);
    console.log('Listening to port', port);
  }

  serverless() {
    const { app } = this;
    return serverless(app);
  }
}
