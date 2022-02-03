"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
// Local Imports
var point_1 = require("./point");
var circle_1 = require("./circle");
var line_1 = require("./line");
/**
 * Representation of 2D Rectangle centered around it's anchor.
 */
var Rectangle = /** @class */ (function () {
    /**
     * Instantiates a new Rectangle centered around anchor.
     *
     * @param {number} x X coordinate of center of rectangle.
     * @param {number} y Y coordinate of center of rectangle.
     * @param {number} width Width of rectangle.
     * @param {number} height Height of rectangle.
     */
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * Determines if a given point lies within the rectangle.
     *
     * @param {Point} point Point to check.
     * @returns {boolean} Whether the point lies within the rectangle.
     */
    Rectangle.prototype.contains = function (point) {
        return (point.x >= this.x - this.width &&
            point.x <= this.x + this.width &&
            point.y >= this.y - this.height &&
            point.y <= this.y + this.height);
    };
    /**
     * Determines if a given rectangle lies within the rectangle.
     *
     * @param {Rectangle | Circle} range Range to check.
     * @returns Whether the rectangle lies within the rectangle.
     */
    Rectangle.prototype.intersects = function (range) {
        if (range instanceof circle_1.Circle) {
            return range.intersects(this);
        }
        else {
            return !(range.x - range.width > this.x + this.width ||
                range.x + range.width < this.x - this.width ||
                range.y - range.height > this.y + this.height ||
                range.y + range.height < this.y - this.height);
        }
    };
    Rectangle.prototype.findIntersectionPoint = function (line) {
        var topIntersection = line.intersection(this.getTopBorder());
        if (topIntersection) {
            return topIntersection;
        }
        var bottomIntersection = line.intersection(this.getBottomBorder());
        if (bottomIntersection) {
            return bottomIntersection;
        }
        var leftIntersection = line.intersection(this.getLeftBorder());
        if (leftIntersection) {
            return leftIntersection;
        }
        var rightIntersection = line.intersection(this.getRightBorder());
        if (rightIntersection) {
            return rightIntersection;
        }
    };
    /**
     * Returns a string representation of the rectangle.
     *
     * @returns {string} String representation of the rectangle.
     */
    Rectangle.prototype.getId = function () {
        return "rect-".concat(this.x, "-").concat(this.y, "-").concat(this.width, "-").concat(this.height);
    };
    /**
     * Returns X coordinate of left side of the rectangle.
     *
     * @returns {number} X coordinate of left side of the rectangle.
     */
    Rectangle.prototype.getLeftX = function () {
        return this.x - this.width / 2;
    };
    /**
     * Returns X coordinate of right side of the rectangle.
     *
     * @returns {number} X coordinate of right side of the rectangle.
     */
    Rectangle.prototype.getRightX = function () {
        return this.x + this.width / 2;
    };
    /**
     * Returns Y coordinate of top side of the rectangle.
     *
     * @returns {number} Y coordinate of top side of the rectangle.
     */
    Rectangle.prototype.getTopY = function () {
        return this.y - this.height / 2;
    };
    /**
     * Returns Y coordinate of top side of the rectangle.
     *
     * @returns {number} Y coordinate of top side of the rectangle.
     */
    Rectangle.prototype.getBottomY = function () {
        return this.y + this.height / 2;
    };
    Rectangle.prototype.getTopLeft = function () {
        return new point_1.Point(this.x - this.width / 2, this.y + this.height / 2);
    };
    Rectangle.prototype.getTopRight = function () {
        return new point_1.Point(this.x + this.width / 2, this.y + this.height / 2);
    };
    Rectangle.prototype.getBottomLeft = function () {
        return new point_1.Point(this.x - this.width / 2, this.y - this.height / 2);
    };
    Rectangle.prototype.getBottomRight = function () {
        return new point_1.Point(this.x + this.width / 2, this.y - this.height / 2);
    };
    Rectangle.prototype.getLeftBorder = function () {
        return new line_1.default(this.getTopLeft(), this.getBottomLeft());
    };
    Rectangle.prototype.getRightBorder = function () {
        return new line_1.default(this.getTopRight(), this.getBottomRight());
    };
    Rectangle.prototype.getTopBorder = function () {
        return new line_1.default(this.getTopLeft(), this.getTopRight());
    };
    Rectangle.prototype.getBottomBorder = function () {
        return new line_1.default(this.getBottomLeft(), this.getBottomRight());
    };
    /**
     * Whether this Rectangle equals another.
     *
     * @param {Rectangle} other Other rectangle to compare.
     * @returns {boolean} Whether this rectangle equals the other.
     */
    Rectangle.prototype.equals = function (other) {
        return (this.x === other.x
            && this.y === other.y
            && this.width === other.width
            && this.height === other.height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
//# sourceMappingURL=rectangle.js.map