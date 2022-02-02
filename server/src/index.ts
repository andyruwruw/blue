// Packages
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Local Imports
import {
  MESSAGE_LISTENING_SUCCESS,
  PORT,
  GLOBE,
} from './config';
import globe from './handlers/globe';

// New Express app.
const app = express();

// Setting up middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

// Globe endpoints
app.use("/api/globe", globe.routes);

// Starting API server.
app.listen(PORT, () => console.log(MESSAGE_LISTENING_SUCCESS));

GLOBE.initialize();
