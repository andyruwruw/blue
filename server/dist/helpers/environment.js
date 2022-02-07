"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
// Packages
var dotenv = require("dotenv");
dotenv.config();
/**
 * Proxy for environment variables.
 */
var Environment = /** @class */ (function () {
    function Environment() {
    }
    /**
     * Retrieves API port.
     *
     * @returns {number} API port.
     */
    Environment.getPort = function () {
        return parseInt(process.env.PORT, 10) || 3000;
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map