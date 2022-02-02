"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
var Circle = /** @class */ (function () {
    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rSquared = this.radius * this.radius;
    }
    Circle.prototype.contains = function (point) {
        var d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return d <= this.rSquared;
    };
    Circle.prototype.intersects = function (range) {
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
    };
    return Circle;
}());
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map