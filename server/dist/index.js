"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// Local Imports
var config_1 = require("./config");
var globe_1 = require("./handlers/globe");
// New Express app.
var app = express();
// Setting up middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(cookieParser());
// Globe endpoints
app.use('/api/globe', globe_1.default.routes);
// Starting API server.
app.listen(config_1.PORT, function () { return console.log(config_1.MESSAGE_LISTENING_SUCCESS); });
config_1.GLOBE.initialize();
//# sourceMappingURL=index.js.map