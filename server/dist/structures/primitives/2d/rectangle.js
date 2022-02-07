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
exports.Rectangle = void 0;
// Local Imports
var primitive_range_1 = require("../primitive-range");
var circle_1 = require("./circle");
var line_1 = require("./line");
var vector_2_1 = require("./vector-2");
var range_helpers_1 = require("../../../helpers/range-helpers");
/**
 * Representation of 2D Rectangle centered around it's anchor.
 */
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    /**
     * Instantiates a new Rectangle centered around anchor.
     *
     * @param {Vector2} anchor Anchoring position for the range.
     * @param {number} width Width of Rectangle.
     * @param {number} height Height of Rectangle.
     */
    function Rectangle(anchor, width, height) {
        var _this = _super.call(this, anchor) || this;
        _this._width = width;
        _this._height = height;
        return _this;
    }
    /**
     * Determines if a given point lies within the range.
     *
     * @param {Vector2} point Point to check.
     * @returns {boolean} Whether the point lies within the range.
     */
    Rectangle.prototype.contains = function (point) {
        return (point.x >= this._anchor.x - this._width &&
            point.x <= this._anchor.x + this._width &&
            point.y >= this._anchor.y - this._height &&
            point.y <= this._anchor.y + this._height);
    };
    /**
     * Determines if a given rectangle lies within the rectangle.
     *
     * @param {PrimitiveRange} range Range to check.
     * @returns Whether the rectangle lies within the rectangle.
     */
    Rectangle.prototype.intersects = function (range) {
        if (range instanceof circle_1.Circle) {
            return (0, range_helpers_1.intersectCircleAndRectangle)(range, this);
        }
        else if (range instanceof Rectangle) {
            if (this.equals(range)) {
                return true;
            }
            return (0, range_helpers_1.intersectRectangles)(this, range);
        }
    };
    /**
     * Finds the intersection point between the Rectangle's borders and a Line.
     *
     * @param {Line} line Line to be checked.
     * @returns {Vector2 | null} Point at which the Line intersects the Rectangle or null if none.
     */
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
        return null;
    };
    /**
     * Returns a string representation of the rectangle.
     *
     * @returns {string} String representation of the rectangle.
     */
    Rectangle.prototype.getId = function () {
        return "rect-".concat(this._anchor.x, "-").concat(this._anchor.y, "-").concat(this._width, "-").concat(this._height);
    };
    /**
     * Retrieves the width of the Rectangle.
     *
     * @returns {number} Width of the Rectangle.
     */
    Rectangle.prototype.getWidth = function () {
        return this._width;
    };
    /**
     * Retrieves the height of the Rectangle.
     *
     * @returns {number} Height of the Rectangle.
     */
    Rectangle.prototype.getHeight = function () {
        return this._height;
    };
    /**
     * Returns X coordinate of left side of the rectangle.
     *
     * @returns {number} X coordinate of left side of the rectangle.
     */
    Rectangle.prototype.getLeftX = function () {
        return this._anchor.x - this._width / 2;
    };
    /**
     * Returns X coordinate of right side of the rectangle.
     *
     * @returns {number} X coordinate of right side of the rectangle.
     */
    Rectangle.prototype.getRightX = function () {
        return this._anchor.x + this._width / 2;
    };
    /**
     * Returns Y coordinate of top side of the rectangle.
     *
     * @returns {number} Y coordinate of top side of the rectangle.
     */
    Rectangle.prototype.getTopY = function () {
        return this._anchor.y - this._height / 2;
    };
    /**
     * Returns Y coordinate of top side of the rectangle.
     *
     * @returns {number} Y coordinate of top side of the rectangle.
     */
    Rectangle.prototype.getBottomY = function () {
        return this._anchor.y + this._height / 2;
    };
    /**
     * Generates a point representing the top-left corner.
     *
     * @returns {Vector2} Point representing the top-left corner.
     */
    Rectangle.prototype.getTopLeft = function () {
        return new vector_2_1.Vector2(this._anchor.x - this._width / 2, this._anchor.y + this._height / 2);
    };
    /**
     * Generates a point representing the top-right corner.
     *
     * @returns {Vector2} Point representing the top-right corner.
     */
    Rectangle.prototype.getTopRight = function () {
        return new vector_2_1.Vector2(this._anchor.x + this._width / 2, this._anchor.y + this._height / 2);
    };
    /**
     * Generates a point representing the bottom-left corner.
     *
     * @returns {Vector2} Point representing the bottom-left corner.
     */
    Rectangle.prototype.getBottomLeft = function () {
        return new vector_2_1.Vector2(this._anchor.x - this._width / 2, this._anchor.y - this._height / 2);
    };
    /**
     * Generates a point representing the bottom-right corner.
     *
     * @returns {Vector2} Point representing the bottom-right corner.
     */
    Rectangle.prototype.getBottomRight = function () {
        return new vector_2_1.Vector2(this._anchor.x + this._width / 2, this._anchor.y - this._height / 2);
    };
    /**
     * Generates a Line representing the left border.
     *
     * @returns {Line} Line representing the left border.
     */
    Rectangle.prototype.getLeftBorder = function () {
        return new line_1.Line(this.getTopLeft(), this.getBottomLeft());
    };
    /**
     * Generates a Line representing the right border.
     *
     * @returns {Line} Line representing the right border.
     */
    Rectangle.prototype.getRightBorder = function () {
        return new line_1.Line(this.getTopRight(), this.getBottomRight());
    };
    /**
     * Generates a Line representing the top border.
     *
     * @returns {Line} Line representing the top border.
     */
    Rectangle.prototype.getTopBorder = function () {
        return new line_1.Line(this.getTopLeft(), this.getTopRight());
    };
    /**
     * Generates a Line representing the bottom border.
     *
     * @returns {Line} Line representing the bottom border.
     */
    Rectangle.prototype.getBottomBorder = function () {
        return new line_1.Line(this.getBottomLeft(), this.getBottomRight());
    };
    /**
     * Generates a Rectangle representing the top-left quadrant.
     *
     * @returns {Rectangle} Rectangle representing the top-left quadrant.
     */
    Rectangle.prototype.getTopLeftQuadrant = function () {
        return new Rectangle(this._anchor.add(new vector_2_1.Vector2(this._width / -2, this._height / 2)), this._width / 2, this._height / 2);
    };
    /**
     * Generates a Rectangle representing the top-right quadrant.
     *
     * @returns {Rectangle} Rectangle representing the top-right quadrant.
     */
    Rectangle.prototype.getTopRightQuadrant = function () {
        return new Rectangle(this._anchor.add(new vector_2_1.Vector2(this._width / 2, this._height / 2)), this._width / 2, this._height / 2);
    };
    /**
     * Generates a Rectangle representing the bottom-left quadrant.
     *
     * @returns {Rectangle} Rectangle representing the bottom-left quadrant.
     */
    Rectangle.prototype.getBottomLeftQuadrant = function () {
        return new Rectangle(this._anchor.add(new vector_2_1.Vector2(this._width / -2, this._height / -2)), this._width / 2, this._height / 2);
    };
    /**
     * Generates a Rectangle representing the bottom-right quadrant.
     *
     * @returns {Rectangle} Rectangle representing the bottom-right quadrant.
     */
    Rectangle.prototype.getBottomRightQuadrant = function () {
        return new Rectangle(this._anchor.add(new vector_2_1.Vector2(this._width / 2, this._height / -2)), this._width / 2, this._height / 2);
    };
    /**
     * Whether this Rectangle equals another.
     *
     * @param {PrimitiveRange} other Other rectangle to compare.
     * @returns {boolean} Whether this rectangle equals the other.
     */
    Rectangle.prototype.equals = function (other) {
        if (other instanceof Rectangle) {
            return (this._anchor.x === other.getAnchor().x
                && this._anchor.y === other.getAnchor().y
                && this._width === other.getWidth()
                && this._height === other.getHeight());
        }
        return false;
    };
    return Rectangle;
}(primitive_range_1.PrimitiveRange));
exports.Rectangle = Rectangle;
//# sourceMappingURL=rectangle.js.map