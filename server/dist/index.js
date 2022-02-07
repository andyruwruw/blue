"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Local Imports
var api_1 = require("./api");
var data_1 = require("./data");
// New instance of REST API.
var server = new api_1.RestApi();
// Load data.
data_1.DataManager.initialize();
// Start the Server.
server.start();
//# sourceMappingURL=index.js.map