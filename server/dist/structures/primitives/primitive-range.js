"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveRange = void 0;
var vector_3_1 = require("./3d/vector-3");
/**
 * Represents an area defined by a polygon.
 */
var PrimitiveRange = /** @class */ (function () {
    /**
     * Instantiates a new range.
     *
     * @param {Vector2 | Vector3} anchor Anchoring position for the range.
     */
    function PrimitiveRange(anchor) {
        this._anchor = anchor;
    }
    /**
     * Determines if a given point lies within the range.
     *
     * @param {Vector2 | Vector3} point Point to check.
     * @returns {boolean} Whether the point lies within the range.
     */
    PrimitiveRange.prototype.contains = function (point) {
        if (point === null) {
            return false;
        }
        return false;
    };
    /**
     * Returns a string representation of the Range.
     *
     * @returns {string} String representation of the Range.
     */
    PrimitiveRange.prototype.getId = function () {
        if (this._anchor instanceof vector_3_1.Vector3) {
            return "range-".concat(this._anchor.x, "-").concat(this._anchor.y, "-").concat(this._anchor.z);
        }
        return "range-".concat(this._anchor.x, "-").concat(this._anchor.y);
    };
    /**
     * Retrieves the Range's anchor.
     *
     * @returns {Vector2 | Vector3} Anchoring position for the range.
     */
    PrimitiveRange.prototype.getAnchor = function () {
        return this._anchor;
    };
    /**
     * Returns whether the range is a 3-dimensional polygon.
     *
     * @returns {boolean} Whether the range is a 3-dimensional polygon.
     */
    PrimitiveRange.prototype.is3Dimension = function () {
        return this._anchor instanceof vector_3_1.Vector3;
    };
    /**
     * Whether this Range equals another.
     *
     * @param {PrimitiveRange} other Other range to compare.
     * @returns {boolean} Whether this range equals the other.
     */
    PrimitiveRange.prototype.equals = function (other) {
        if (this._anchor instanceof vector_3_1.Vector3) {
            return (this._anchor.x === other.getAnchor().x
                && this._anchor.y === other.getAnchor().y
                && this._anchor.z === other.getAnchor().z);
        }
        return (this._anchor.x === other.getAnchor().x
            && this._anchor.y === other.getAnchor().y);
    };
    return PrimitiveRange;
}());
exports.PrimitiveRange = PrimitiveRange;
//# sourceMappingURL=primitive-range.js.map