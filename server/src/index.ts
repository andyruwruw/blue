// Local Imports
import { RestApi } from './api';
import { DataManager } from './data';

// New instance of REST API.
const server = new RestApi();

// New instance of DataManager.
const dataManager = new DataManager();

dataManager.initialize();

// Start the Server.
server.start();
