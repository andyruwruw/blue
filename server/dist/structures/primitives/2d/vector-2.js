"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
// Packages
var coordinate_helpers_1 = require("../../../helpers/coordinate-helpers");
/**
 * 2-dimensional vector.
 */
var Vector2 = /** @class */ (function () {
    /**
     * Instantiates a new Vector2.
     *
     * @param {number} x X coordinate.
     * @param {number} y Y coordinate.
     */
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    /**
     * Returns the sum of this Vector2 and another.
     *
     * @param {Vector2} vector Other vector to add.
     * @returns {Vector2} Sum of this Vector2 and the other.
     */
    Vector2.prototype.add = function (vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    };
    /**
     * Returns the difference of this Vector2 and another.
     *
     * @param {Vector2} vector Other vector to subtract.
     * @returns {Vector2} Difference of this Vector2 and the other.
     */
    Vector2.prototype.subtract = function (vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    };
    /**
     * Retrieves the magnitude of the Vector2.
     *
     * @returns {number} Magnitude of the Vector2.
     */
    Vector2.prototype.getMagnitude = function () {
        return (0, coordinate_helpers_1.distance2D)(new Vector2(), this);
    };
    return Vector2;
}());
exports.Vector2 = Vector2;
//# sourceMappingURL=vector-2.js.map