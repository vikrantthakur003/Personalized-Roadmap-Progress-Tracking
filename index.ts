require('dotenv')
  .config();
import express from 'express';
import { appLoader, databaseLoader } from './src/loaders';
import { router } from './src/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/config/swagger.json'; 

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
