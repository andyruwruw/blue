// Packages
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Local Imports
import {
  BASE_API_PATH,
  MESSAGE_LISTENING_SUCCESS,
  PORT,
} from './config';
import globe from './handlers/globe';

export class RestApi {
  app: express.Express;

  constructor() {
    this.app = express();

    this.initializeMiddleware();
  }

  initializeMiddleware() {
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({
      extended: false,
    }));

    this.app.use(cookieParser());
  }

  initializeHandlers() {
    this.app.use(`${BASE_API_PATH}${globe.path}`, globe.routes);
  }

  start() {
    this.app.listen(PORT, () => console.log(`[${RestApi.name}]: ${MESSAGE_LISTENING_SUCCESS}`));
  }
}
