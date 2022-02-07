// Packages
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Local Imports
import {
  BASE_API_PATH,
  PORT,
} from './config';
import {
  Monitor,
  MonitorLayer,
} from '../helpers/monitor';
import globe from './handlers/globe';

/**
 * Manages an express server.
 */
export class RestApi {
  app: express.Express;

  /**
   * Instantiates a new RestApi.
   */
  constructor() {
    this.app = express();

    this.initializeMiddleware();
  }

  /**
   * Initializes express middleware.
   */
  initializeMiddleware() {
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({
      extended: false,
    }));

    this.app.use(cookieParser());
  }

  /**
   * Initializes the routes / endpoints.
   */
  initializeHandlers() {
    this.app.use(`${BASE_API_PATH}${globe.path}`, globe.routes);
  }

  /**
   * Starts the server.
   */
  start() {
    this.app.listen(
      PORT,
      () => Monitor.log(
        RestApi,
        `Listening on port ${PORT}`,
        MonitorLayer.NOTIFICATION,
      ),
    );
  }
}
