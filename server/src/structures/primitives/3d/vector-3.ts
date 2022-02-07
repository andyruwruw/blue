// Local Imports
import { distance3D } from '../../../helpers/coordinate-helpers';

/**
 * 3-dimensional vector.
 */
export class Vector3 {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;

  /**
   * Z coordinate.
   */
  z: number;

  /**
   * Instantiates a new Vector3.
   *
   * @param {number} x X coordinate.
   * @param {number} y Y coordinate.
   * @param {number} z Z coordinate.
   */
  constructor(
    x: number = 0,
    y: number = 0,
    z: number = 0,
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns the sum of this Vector3 and another.
   *
   * @param {Vector3} vector Other vector to add.
   * @returns {Vector3} Sum of this Vector3 and the other.
   */
  add(vector: Vector3): Vector3 {
    return new Vector3(
      this.x + vector.x,
      this.y + vector.y,
      this.y + vector.z,
    );
  }

  /**
   * Returns the difference of this Vector3 and another.
   *
   * @param {Vector3} vector Other vector to subtract.
   * @returns {Vector3} Difference of this Vector3 and the other.
   */
  subtract(vector: Vector3): Vector3 {
    return new Vector3(
      this.x - vector.x,
      this.y - vector.y,
      this.y - vector.z,
    );
  }

  /**
   * Retrieves the magnitude of the Vector3.
   *
   * @returns {number} Magnitude of the Vector3.
   */
  getMagnitude(): number {
    return distance3D(
      new Vector3(),
      this,
    );
  }
}
