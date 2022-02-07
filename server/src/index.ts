// Local Imports
import { RestApi } from './api';
import { DataManager } from './data';

// New instance of REST API.
const server = new RestApi();

// Load data.
DataManager.initialize();

// Start the Server.
server.start();
