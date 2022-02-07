"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
// Local Imports
var range_helpers_1 = require("../../../helpers/range-helpers");
var coordinate_helpers_1 = require("../../../helpers/coordinate-helpers");
var primitive_range_1 = require("../primitive-range");
var rectangle_1 = require("./rectangle");
/**
 * Representation of 2D Circle centered around it's anchor.
 */
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    /**
     * Instantiates a new Circle centered around the anchor.
     *
     * @param {Vector2} anchor Anchoring position for the range.
     * @param {number} radius Radius of circle.
     */
    function Circle(anchor, radius) {
        var _this = _super.call(this, anchor) || this;
        _this._radius = radius;
        _this._rSquared = _this._radius * _this._radius;
        return _this;
    }
    /**
     * Determines if a given point lies within the range.
     *
     * @param {Vector2} point Point to check.
     * @returns {boolean} Whether the point lies within the range.
     */
    Circle.prototype.contains = function (point) {
        return (0, coordinate_helpers_1.distance2D)(this._anchor, point) <= this._radius;
    };
    /**
     * Determines if another range lies within or intersects with the range.
     *
     * @param {PrimitiveRange} range Range to check.
     * @returns Whether the range lies within or intersects the rectangle.
     */
    Circle.prototype.intersects = function (range) {
        if (range instanceof rectangle_1.Rectangle) {
            return (0, range_helpers_1.intersectCircleAndRectangle)(this, range);
        }
        else if (range instanceof Circle) {
            if (this.equals(range)) {
                return true;
            }
            return (0, range_helpers_1.intersectCircles)(this, range);
        }
        return false;
    };
    /**
     * Returns a string representation of the Range.
     *
     * @returns {string} String representation of the Range.
     */
    Circle.prototype.getId = function () {
        return "circ-".concat(this._anchor.x, "-").concat(this._anchor.y, "-").concat(this._radius);
    };
    /**
     * Retrieves the radius for the Circle.
     *
     * @returns {number} Radius of the Circle.
     */
    Circle.prototype.getRadius = function () {
        return this._radius;
    };
    /**
     * Retrieves the radius for the Circle squared.
     *
     * @returns {number} Radius of the Circle squared.
     */
    Circle.prototype.getRSquared = function () {
        return this._rSquared;
    };
    /**
     * Whether this Range equals another.
     *
     * @param {PrimitiveRange} other Other range to compare.
     * @returns {boolean} Whether this range equals the other.
     */
    Circle.prototype.equals = function (other) {
        if (!(other instanceof Circle)) {
            return false;
        }
        return (this._anchor.x === other.getAnchor().x
            && this._anchor.y === other.getAnchor().y);
    };
    return Circle;
}(primitive_range_1.PrimitiveRange));
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map