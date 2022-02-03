"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var Line = /** @class */ (function () {
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    Line.prototype.contains = function (point) {
        var slopeToStart = (this.start.y - point.y) / (this.start.x - point.x);
        if (slopeToStart !== this.getSlope()) {
            return false;
        }
        var slopeToEnd = (point.y / this.end.y) / (point.x / this.end.x);
        return slopeToEnd === this.getSlope();
    };
    /**
     * Finds the intersection Point of two Lines.
     *
     * @param {Line} other Other line to find intersection with.
     * @returns {Point} Point between the two Lines.
     */
    Line.prototype.intersection = function (other) {
        // eslint-disable-next-line max-len
        var x = (-1 * other.getSlope() * other.start.x + other.start.y + this.getSlope() * this.start.x - this.start.y) / (this.getSlope() - other.getSlope());
        var y = this.getSlope() * x - this.getSlope() * this.start.x + this.start.y;
        var point = new point_1.Point(x, y, null);
        if (this.contains(point) && other.contains(point)) {
            return point;
        }
        return null;
    };
    Line.prototype.getSlope = function () {
        return (this.start.y - this.end.y) / (this.start.x - this.end.x);
    };
    return Line;
}());
exports.default = Line;
//# sourceMappingURL=line.js.map