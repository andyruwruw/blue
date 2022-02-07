"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApi = void 0;
// Packages
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// Local Imports
var config_1 = require("./config");
var globe_1 = require("./handlers/globe");
var RestApi = /** @class */ (function () {
    function RestApi() {
        this.app = express();
        this.initializeMiddleware();
    }
    RestApi.prototype.initializeMiddleware = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(cookieParser());
    };
    RestApi.prototype.initializeHandlers = function () {
        this.app.use("".concat(config_1.BASE_API_PATH).concat(globe_1.default.path), globe_1.default.routes);
    };
    RestApi.prototype.start = function () {
        this.app.listen(config_1.PORT, function () { return console.log(config_1.MESSAGE_LISTENING_SUCCESS); });
    };
    return RestApi;
}());
exports.RestApi = RestApi;
//# sourceMappingURL=index.js.map