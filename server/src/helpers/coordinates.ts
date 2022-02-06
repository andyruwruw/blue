// Local Imports
import { Vector2 } from '../structures/primitives/2d/vector-2';
import { Vector3 } from '../structures/primitives/3d/vector-3';

/**
 * Returns the distance between two points using Euclidean distance.
 *
 * @param {Vector2} point1 First point to find distance between.
 * @param {Vector2} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
export const distance2D = (
  point1: Vector2,
  point2: Vector2,
): number => {
  const xDiffSquared = Math.pow((point1.x - point2.x), 2);
  const yDiffSquared = Math.pow((point1.y - point2.y), 2);

  return Math.sqrt(xDiffSquared + yDiffSquared);
}

/**
 * Returns the distance between two points using Manhattan distance.
 *
 * @param {Vector2} point1 First point to find distance between.
 * @param {Vector2} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
export const distance2DSimplified = (
  point1: Vector2,
  point2: Vector2,
): number => {
  const xDiff = point1.x - point2.x;
  const yDiff = point1.y - point2.y;

  return xDiff + yDiff;
}

/**
 * Returns the distance between two points using Euclidean distance.
 *
 * @param {Vector3} point1 First point to find distance between.
 * @param {Vector3} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
 export const distance3D = (
  point1: Vector3,
  point2: Vector3,
): number => {
  const xDiffSquared = Math.pow((point1.x - point2.x), 2);
  const yDiffSquared = Math.pow((point1.y - point2.y), 2);
  const zDiffSquared = Math.pow((point1.z - point2.z), 2);

  return Math.sqrt(xDiffSquared + yDiffSquared + zDiffSquared);
}

/**
 * Returns the distance between two points using Manhattan distance.
 *
 * @param {Vector3} point1 First point to find distance between.
 * @param {Vector3} point2 Second point to find distance between.
 * @returns {number} Distance between the two points.
 */
export const distance3DSimplified = (
  point1: Vector3,
  point2: Vector3,
): number => {
  const xDiff = point1.x - point2.x;
  const yDiff = point1.y - point2.y;
  const zDiff = point1.z - point2.z;

  return xDiff + yDiff + zDiff;
}

/**
 * Creates a Vector3 from longitude and latitude positions.
 *
 * @param {number} longitude Longitude position of the point.
 * @param {number} latitude Latitude position of the point.
 * @param {number} radius Radius of the sphere.
 * @returns {Vector3} Vector3 representing the point.
 */
export const longitudeAndLatitudeToCartesian = (
  longitude: number,
  latitude: number,
  radius: number = 1,
): Vector3 => {
  const cosLatitude = Math.cos(latitude);

  return new Vector3(
    radius * cosLatitude * Math.cos(longitude),
    radius * cosLatitude * Math.sin(longitude),
    radius * Math.sin(latitude),
  );
};

/**
 * Rotates a point around the X axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
export const rotateAroundXAxis = (
  position: Vector3,
  theta: number,
) => {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return new Vector3(
    position.x,
    position.y * cosTheta + position.z * sinTheta,
    position.z * cosTheta - position.y * sinTheta,
  );
}

/**
 * Rotates a point around the Y axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
 export const rotateAroundYAxis = (
  position: Vector3,
  theta: number,
) => {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return new Vector3(
    position.x * cosTheta + position.z * sinTheta,
    position.y,
    position.z * cosTheta - position.x * sinTheta,
  );
}

/**
 * Rotates a point around the Z axis by Theta.
 *
 * @param {Vector3} position Original position to be rotated.
 * @param {number} theta Angle to rotate by.
 * @returns {Vector3} New position after rotation.
 */
 export const rotateAroundZAxis = (
  position: Vector3,
  theta: number,
) => {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  return new Vector3(
    position.x * cosTheta + position.y * sinTheta,
    position.y * cosTheta - position.x * sinTheta,
    position.z,
  );
}

/**
 * Converts an angle from degrees to radians.
 *
 * @param {number} degrees Angle in degrees.
 * @returns {number} Angle in radians
 */
export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);
