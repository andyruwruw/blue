"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = void 0;
// Local Imports
var coordinate_helpers_1 = require("../../../helpers/coordinate-helpers");
/**
 * 3-dimensional vector.
 */
var Vector3 = /** @class */ (function () {
    /**
     * Instantiates a new Vector3.
     *
     * @param {number} x X coordinate.
     * @param {number} y Y coordinate.
     * @param {number} z Z coordinate.
     */
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
     * Returns the sum of this Vector3 and another.
     *
     * @param {Vector3} vector Other vector to add.
     * @returns {Vector3} Sum of this Vector3 and the other.
     */
    Vector3.prototype.add = function (vector) {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.y + vector.z);
    };
    /**
     * Returns the difference of this Vector3 and another.
     *
     * @param {Vector3} vector Other vector to subtract.
     * @returns {Vector3} Difference of this Vector3 and the other.
     */
    Vector3.prototype.subtract = function (vector) {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.y - vector.z);
    };
    /**
     * Retrieves the magnitude of the Vector3.
     *
     * @returns {number} Magnitude of the Vector3.
     */
    Vector3.prototype.getMagnitude = function () {
        return (0, coordinate_helpers_1.distance3D)(new Vector3(), this);
    };
    return Vector3;
}());
exports.Vector3 = Vector3;
//# sourceMappingURL=vector-3.js.map