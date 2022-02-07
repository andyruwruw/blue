"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBE_API_PATH = exports.BASE_API_PATH = exports.MESSAGE_LISTENING_SUCCESS = exports.PORT = void 0;
// Local Imports
var environment_1 = require("../../helpers/environment");
/**
 * Port for API to be served from.
 */
exports.PORT = environment_1.Environment.getPort();
/**
 * Console message when API is listening and ready.
 */
exports.MESSAGE_LISTENING_SUCCESS = "Listening on port ".concat(exports.PORT);
/**
 * Path to API endpoints.
 */
exports.BASE_API_PATH = '/api';
/**
 * Path to Globe endpoints.
 */
exports.GLOBE_API_PATH = '/globe';
//# sourceMappingURL=index.js.map