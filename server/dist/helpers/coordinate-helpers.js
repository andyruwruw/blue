"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degreesToRadians = exports.rotateAroundZAxis = exports.rotateAroundYAxis = exports.rotateAroundXAxis = exports.longitudeAndLatitudeToCartesian = exports.distance3DSimplified = exports.distance3D = exports.distance2DSimplified = exports.distance2D = void 0;
var vector_3_1 = require("../structures/primitives/3d/vector-3");
/**
 * Returns the distance between two points using Euclidean distance.
 *
 * @param {Vector2} point1 First point to find distance between.
 * @param {Vector2} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
var distance2D = function (point1, point2) {
    var xDiffSquared = Math.pow((point1.x - point2.x), 2);
    var yDiffSquared = Math.pow((point1.y - point2.y), 2);
    return Math.sqrt(xDiffSquared + yDiffSquared);
};
exports.distance2D = distance2D;
/**
 * Returns the distance between two points using Manhattan distance.
 *
 * @param {Vector2} point1 First point to find distance between.
 * @param {Vector2} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
var distance2DSimplified = function (point1, point2) {
    var xDiff = point1.x - point2.x;
    var yDiff = point1.y - point2.y;
    return xDiff + yDiff;
};
exports.distance2DSimplified = distance2DSimplified;
/**
 * Returns the distance between two points using Euclidean distance.
 *
 * @param {Vector3} point1 First point to find distance between.
 * @param {Vector3} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
var distance3D = function (point1, point2) {
    var xDiffSquared = Math.pow((point1.x - point2.x), 2);
    var yDiffSquared = Math.pow((point1.y - point2.y), 2);
    var zDiffSquared = Math.pow((point1.z - point2.z), 2);
    return Math.sqrt(xDiffSquared + yDiffSquared + zDiffSquared);
};
exports.distance3D = distance3D;
/**
 * Returns the distance between two points using Manhattan distance.
 *
 * @param {Vector3} point1 First point to find distance between.
 * @param {Vector3} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
var distance3DSimplified = function (point1, point2) {
    var xDiff = point1.x - point2.x;
    var yDiff = point1.y - point2.y;
    var zDiff = point1.z - point2.z;
    return xDiff + yDiff + zDiff;
};
exports.distance3DSimplified = distance3DSimplified;
/**
 * Creates a Vector3 from longitude and latitude positions.
 *
 * @param {number} longitude Longitude position of the point.
 * @param {number} latitude Latitude position of the point.
 * @param {number} radius Radius of the sphere.
 * @returns {Vector3} Vector3 representing the point.
 */
var longitudeAndLatitudeToCartesian = function (longitude, latitude, radius) {
    if (radius === void 0) { radius = 1; }
    var cosLatitude = Math.cos(latitude);
    return new vector_3_1.Vector3(radius * cosLatitude * Math.cos(longitude), radius * cosLatitude * Math.sin(longitude), radius * Math.sin(latitude));
};
exports.longitudeAndLatitudeToCartesian = longitudeAndLatitudeToCartesian;
/**
 * Rotates a point around the X axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
var rotateAroundXAxis = function (position, theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return new vector_3_1.Vector3(position.x, position.y * cosTheta + position.z * sinTheta, position.z * cosTheta - position.y * sinTheta);
};
exports.rotateAroundXAxis = rotateAroundXAxis;
/**
 * Rotates a point around the Y axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
var rotateAroundYAxis = function (position, theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return new vector_3_1.Vector3(position.x * cosTheta + position.z * sinTheta, position.y, position.z * cosTheta - position.x * sinTheta);
};
exports.rotateAroundYAxis = rotateAroundYAxis;
/**
 * Rotates a point around the Z axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
var rotateAroundZAxis = function (position, theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return new vector_3_1.Vector3(position.x * cosTheta + position.y * sinTheta, position.y * cosTheta - position.x * sinTheta, position.z);
};
exports.rotateAroundZAxis = rotateAroundZAxis;
/**
 * Converts an angle from degrees to radians.
 *
 * @param {number} degrees Angle in degrees.
 * @returns {number} Angle in radians
 */
var degreesToRadians = function (degrees) { return degrees * (Math.PI / 180); };
exports.degreesToRadians = degreesToRadians;
//# sourceMappingURL=coordinate-helpers.js.map