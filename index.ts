require('dotenv')
  .config();
import express from 'express';
import { appLoader, databaseLoader } from './src/loaders';
import { router } from './src/routers';

const app = express();

databaseLoader()
  .then(() => appLoader(app, router))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
