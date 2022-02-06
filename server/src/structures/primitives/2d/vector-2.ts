// Packages
import { distance2D } from '../../../helpers/coordinates';

/**
 * 2-dimensional vector.
 */
export class Vector2 {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;

  /**
   * Instantiates a new Vector2.
   *
   * @param {number} x X coordinate.
   * @param {number} y Y coordinate.
   */
  constructor(
    x: number = 0,
    y: number = 0,
  ) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the sum of this Vector2 and another.
   *
   * @param {Vector2} vector Other vector to add.
   * @returns {Vector2} Sum of this Vector2 and the other.
   */
  add(vector: Vector2): Vector2 {
    return new Vector2(
      this.x + vector.x,
      this.y + vector.y,
    );
  }

  /**
   * Returns the difference of this Vector2 and another.
   *
   * @param {Vector2} vector Other vector to subtract.
   * @returns {Vector2} Difference of this Vector2 and the other.
   */
  subtract(vector: Vector2): Vector2 {
    return new Vector2(
      this.x - vector.x,
      this.y - vector.y,
    );
  }

  /**
   * Retrieves the magnitude of the Vector2.
   *
   * @returns {number} Magnitude of the Vector2.
   */
  getMagnitude(): number {
    return distance2D(
      new Vector2(),
      this,
    );
  }
}
