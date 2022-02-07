"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
// Local Imports
var vector_2_1 = require("./vector-2");
/**
 * Representation of a line in 2D space.
 */
var Line = /** @class */ (function () {
    /**
     * Instantiates a new Line from the start to the end.
     *
     * @param {Vector2} start Starting position of the Line.
     * @param {Vector2} end Ending position of the Line.
     */
    function Line(start, end) {
        this._start = start;
        this._end = end;
    }
    /**
     * Whether a point lies within the Line.
     *
     * @param {Vector2} point Point to check.
     * @returns {boolean} Whether the point lies within the Line.
     */
    Line.prototype.contains = function (point) {
        var pointToStart = new Line(this._start, point);
        var pointToEnd = new Line(point, this._end);
        return pointToStart.getSlope() === pointToEnd.getSlope()
            && point.x >= this._start.x
            && point.x <= this._end.x;
    };
    /**
     * Finds the intersection Point of two Lines.
     *
     * @param {Line} other Other line to find intersection with.
     * @returns {Point} Point between the two Lines.
     */
    Line.prototype.intersection = function (other) {
        // eslint-disable-next-line max-len
        var x = (-1 * other.getSlope() * other.getStart().x + other.getStart().y + this.getSlope() * this._start.x - this._start.y) / (this.getSlope() - other.getSlope());
        var y = this.getSlope() * x - this.getSlope() * this._start.x + this._start.y;
        var point = new vector_2_1.Vector2(x, y);
        if (this.contains(point) && other.contains(point)) {
            return point;
        }
        return null;
    };
    /**
     * Retrieves the start of the Line.
     *
     * @returns {Vector2} Start of the line.
     */
    Line.prototype.getStart = function () {
        return this._start;
    };
    /**
     * Retrieves the end of the Line.
     *
     * @returns {Vector2} End of the line.
     */
    Line.prototype.getEnd = function () {
        return this._end;
    };
    /**
     * Retrieves the slope of the line.
     *
     * @returns {number} Slope of the line.
     */
    Line.prototype.getSlope = function () {
        var yDiff = this._start.y - this._end.y;
        var xDiff = this._start.x - this._end.x;
        return yDiff / xDiff;
    };
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.js.map