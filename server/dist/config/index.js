"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLOBE = exports.GSHHG_RESOLUTION_NAMES = exports.GSHHG_FILE_PREFIX = exports.GSHHG_FILE_POSTFIX = exports.GSHHG_DIRECTORY_NAME = exports.GSSHG_POSITION_SCALE = exports.GSSHG_POINT_HALF_BYTE_SIZE = exports.GSHHG_HALF_BYTE_SIZE = exports.MESSAGE_LISTENING_SUCCESS = exports.PORT = void 0;
// Packages
var dotenv = require("dotenv");
// Local Imports
var globe_1 = require("../structures/globe/globe");
dotenv.config();
/**
 * Port for API to be served from.
 */
exports.PORT = process.env.PORT;
/**
 * Console message when API is listening and ready.
 */
exports.MESSAGE_LISTENING_SUCCESS = "Listening on port ".concat(exports.PORT);
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) object
 */
exports.GSHHG_HALF_BYTE_SIZE = 88;
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) point.
 */
exports.GSSHG_POINT_HALF_BYTE_SIZE = 16;
/**
 * Scale of positional data relative to a degree.
 */
exports.GSSHG_POSITION_SCALE = 0.000001;
/**
 * Directory of GSHHG binary files.
 */
exports.GSHHG_DIRECTORY_NAME = 'gshhg-bin-2.3.7';
/**
 * File prefix of GSHHG binary files.
 */
exports.GSHHG_FILE_POSTFIX = '.b';
/**
 * File prefix of GSHHG binary files.
 */
exports.GSHHG_FILE_PREFIX = 'gshhs_';
/**
 * Resolution names of GSHHG binary files.
 */
exports.GSHHG_RESOLUTION_NAMES = [
    'c',
    'l',
    'i',
    'h',
    'f',
];
exports.GLOBE = new globe_1.default();
//# sourceMappingURL=index.js.map