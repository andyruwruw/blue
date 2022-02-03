"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
// Local Imports
var circle_1 = require("../primitives/circle");
var rectangle_1 = require("../primitives/rectangle");
/**
 * Defines a 2D array of data queriable by a range.
 */
var QuadTree = /** @class */ (function () {
    function QuadTree(boundary, capacity) {
        if (!boundary) {
            throw TypeError('Boundary is null or undefined.');
        }
        if (!(boundary instanceof rectangle_1.Rectangle)) {
            throw TypeError('boundary should be a Rectangle');
        }
        if (typeof capacity !== 'number') {
            throw TypeError("capacity should be a number but is a ".concat(typeof capacity));
        }
        if (capacity < 1) {
            throw RangeError('capacity must be greater than 0');
        }
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    QuadTree.prototype.insert = function (point) {
        if (!this.boundary.contains(point)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }
        return (this.northeast.insert(point) || this.northwest.insert(point) ||
            this.southeast.insert(point) || this.southwest.insert(point));
    };
    QuadTree.prototype.subdivide = function () {
        var x = this.boundary.x;
        var y = this.boundary.y;
        var w = this.boundary.width / 2;
        var h = this.boundary.height / 2;
        var ne = new rectangle_1.Rectangle(x + w, y, w, h);
        this.northeast = new QuadTree(ne, this.capacity);
        var nw = new rectangle_1.Rectangle(x, y, w, h);
        this.northwest = new QuadTree(nw, this.capacity);
        var se = new rectangle_1.Rectangle(x + w, y + h, w, h);
        this.southeast = new QuadTree(se, this.capacity);
        var sw = new rectangle_1.Rectangle(x, y + h, w, h);
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;
    };
    QuadTree.prototype.query = function (range, found) {
        if (found === void 0) { found = []; }
        if (!found) {
            found = [];
        }
        if (!range.intersects(this.boundary)) {
            return found;
        }
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            if (range.contains(p)) {
                found.push(p);
            }
        }
        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }
        return found;
    };
    QuadTree.prototype.closest = function (point, count, maxDistance) {
        if (typeof point === 'undefined') {
            throw TypeError('Method \'closest\' needs a point');
        }
        if (typeof count === 'undefined') {
            count = 1;
        }
        // Limit to number of points in this QuadTree
        if (this.length == 0) {
            return [];
        }
        if (this.length < count) {
            return this.points;
        }
        if (typeof maxDistance === 'undefined') {
            // A circle that contains the entire QuadTree
            var outerReach = Math.sqrt(Math.pow(this.boundary.width, 2) + Math.pow(this.boundary.height, 2));
            // Distance of query point from center
            var pointDistance = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
            // One QuadTree size away from the query point
            maxDistance = outerReach + pointDistance;
        }
        // Binary search with Circle queries
        var inner = 0;
        var outer = maxDistance;
        var limit = 8; // Limit to avoid infinite loops caused by ties
        var points;
        while (limit > 0) {
            var radius = (inner + outer) / 2;
            var range = new circle_1.Circle(point.x, point.y, radius);
            points = this.query(range);
            if (points.length === count) {
                return points; // Return when we hit the right size
            }
            else if (points.length < count) {
                inner = radius;
            }
            else {
                outer = radius;
                limit--;
            }
        }
        // Sort by squared distance
        points.sort(function (a, b) {
            var aDist = Math.pow(point.x - a.x, 2) +
                Math.pow(point.y - a.y, 2);
            var bDist = Math.pow(point.x - b.x, 2) +
                Math.pow(point.y - b.y, 2);
            return aDist - bDist;
        });
        // Slice to return correct count (breaks ties)
        return points.slice(0, count);
    };
    QuadTree.prototype.forEach = function (fn) {
        this.points.forEach(fn);
        if (this.divided) {
            this.northeast.forEach(fn);
            this.northwest.forEach(fn);
            this.southeast.forEach(fn);
            this.southwest.forEach(fn);
        }
    };
    QuadTree.prototype.merge = function (other, capacity) {
        var left = Math.min(this.boundary.getLeftX(), other.boundary.getLeftX());
        var right = Math.max(this.boundary.getRightX(), other.boundary.getRightX());
        var top = Math.min(this.boundary.getTopY(), other.boundary.getTopY());
        var bottom = Math.max(this.boundary.getBottomY(), other.boundary.getBottomY());
        var height = bottom - top;
        var width = right - left;
        var midX = left + width / 2;
        var midY = top + height / 2;
        var boundary = new rectangle_1.Rectangle(midX, midY, width, height);
        var result = new QuadTree(boundary, capacity);
        this.forEach(function (point) { return result.insert(point); });
        other.forEach(function (point) { return result.insert(point); });
        return result;
    };
    Object.defineProperty(QuadTree.prototype, "length", {
        get: function () {
            var count = this.points.length;
            if (this.divided) {
                count += this.northwest.length;
                count += this.northeast.length;
                count += this.southwest.length;
                count += this.southeast.length;
            }
            return count;
        },
        enumerable: false,
        configurable: true
    });
    return QuadTree;
}());
exports.QuadTree = QuadTree;
//# sourceMappingURL=quadtree.js.map