"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var rectangle_1 = require("./rectangle");
/**
 * Representation of 2D Circle centered around it's anchor.
 */
var Circle = /** @class */ (function () {
    /**
     * Instantiates a new Circle centered around anchor.
     *
     * @param {number} x X coordinate of center of circle.
     * @param {number} y Y coordinate of center of circle.
     * @param {number} radius Radius of circle.
     */
    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rSquared = this.radius * this.radius;
    }
    /**
     * Determines if a given point lies within the circle.
     *
     * @param {Point} point Point to check.
     * @returns {boolean} Whether the point lies within the circle.
     */
    Circle.prototype.contains = function (point) {
        var d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return d <= this.rSquared;
    };
    /**
     * Determines if a given rectangle lies within the rectangle.
     *
     * @param {Rectangle | Circle} range Range to check.
     * @returns Whether the rectangle lies within the rectangle.
     */
    Circle.prototype.intersects = function (range) {
        if (range instanceof rectangle_1.Rectangle) {
            var xDist = Math.abs(range.x - this.x);
            var yDist = Math.abs(range.y - this.y);
            var r = this.radius;
            var w = range.width;
            var h = range.height;
            var edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
            if (xDist > (r + w) || yDist > (r + h)) {
                return false;
            }
            if (xDist <= w || yDist <= h) {
                return true;
            }
            return edges <= this.rSquared;
        }
        else {
            var xDiffSquared = Math.pow((range.x - this.x), 2);
            var yDiffSquared = Math.pow((range.y - this.y), 2);
            var radiusCombined = this.radius + range.radius;
            return Math.sqrt(xDiffSquared + yDiffSquared) <= radiusCombined;
        }
    };
    /**
     * Returns a string representation of the circle.
     *
     * @returns {string} String representation of the circle.
     */
    Circle.prototype.getId = function () {
        return "circ-".concat(this.x, "-").concat(this.y, "-").concat(this.radius);
    };
    /**
     * Whether this Cirlce equals another.
     *
     * @param {Cirlce} other Other circle to compare.
     * @returns {boolean} Whether this circle equals the other.
     */
    Circle.prototype.equals = function (other) {
        return (this.x === other.x
            && this.y === other.y
            && this.radius === other.radius);
    };
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map