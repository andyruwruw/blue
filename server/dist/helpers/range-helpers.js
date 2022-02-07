"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectRectangles = exports.intersectCircles = exports.intersectCircleAndRectangle = void 0;
var coordinate_helpers_1 = require("./coordinate-helpers");
/**
 * Determines if a Circle and Rectangle overlap.
 *
 * @param {Circle} circle Circle to be checked.
 * @param {Rectangle} rectangle Rectangle to be checked.
 * @returns {boolean} Whether the Circle and Rectangle overlap.
 */
var intersectCircleAndRectangle = function (circle, rectangle) {
    var xDist = Math.abs(rectangle.getAnchor().x - circle.getAnchor().x);
    var yDist = Math.abs(rectangle.getAnchor().y - circle.getAnchor().y);
    var xEdges = Math.pow((xDist - rectangle.getWidth()), 2);
    var yEdges = Math.pow((yDist - rectangle.getHeight()), 2);
    var edges = xEdges + yEdges;
    if (xDist > (circle.getRadius() + rectangle.getWidth())
        || yDist > (circle.getRadius() + rectangle.getHeight())) {
        return false;
    }
    if (xDist <= rectangle.getWidth()
        || yDist <= rectangle.getHeight()) {
        return true;
    }
    return edges <= circle.getRSquared();
};
exports.intersectCircleAndRectangle = intersectCircleAndRectangle;
/**
 * Determines if a Circle and Circle overlap.
 *
 * @param {Circle} circle1 First Circle to be checked.
 * @param {Circle} circle2 Second Circle to be checked.
 * @returns {boolean} Whether the Circles overlap.
 */
var intersectCircles = function (circle1, circle2) {
    var distanceBetweenAnchors = (0, coordinate_helpers_1.distance2D)(circle1.getAnchor(), circle2.getAnchor());
    var radiusCombined = circle1.getRadius() + circle2.getRadius();
    return distanceBetweenAnchors <= radiusCombined;
};
exports.intersectCircles = intersectCircles;
/**
 * Determines if a Rectangle and Rectangle overlap.
 *
 * @param {Rectangle} rectangle1 First Rectangle to be checked.
 * @param {Rectangle} rectagle2 Second Rectangle to be checked.
 * @returns {boolean} Whether the Rectangles overlap.
 */
var intersectRectangles = function (rectangle1, rectangle2) {
    return !(rectangle1.getAnchor().x - rectangle1.getWidth() > rectangle2.getAnchor().x + rectangle2.getWidth() ||
        rectangle1.getAnchor().x + rectangle1.getWidth() < rectangle2.getAnchor().x - rectangle2.getWidth() ||
        rectangle1.getAnchor().y - rectangle1.getHeight() > rectangle2.getAnchor().y + rectangle2.getHeight() ||
        rectangle1.getAnchor().y + rectangle1.getHeight() < rectangle2.getAnchor().y - rectangle2.getHeight());
};
exports.intersectRectangles = intersectRectangles;
//# sourceMappingURL=range-helpers.js.map