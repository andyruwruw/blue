// Local Imports
import { Point } from './point';
import { Rectangle } from './rectangle';

/**
 * Representation of 2D Circle centered around it's anchor.
 */
export class Circle {
  /**
   * X coordinate of center of circle.
   */
  x: number;

  /**
   * Y coordinate of center of circle.
   */
  y: number;

  /**
   * Radius of circle.
   */
  radius: number;

  /**
   * Pre-calculated radius squared.
   */
  rSquared: number;

  /**
   * Instantiates a new Circle centered around anchor.
   *
   * @param {number} x X coordinate of center of circle.
   * @param {number} y Y coordinate of center of circle.
   * @param {number} radius Radius of circle.
   */
  constructor(
    x: number,
    y: number,
    radius: number,
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rSquared = this.radius * this.radius;
  }

  /**
   * Determines if a given point lies within the circle.
   *
   * @param {Point} point Point to check.
   * @returns {boolean} Whether the point lies within the circle.
   */
  contains(point: Point) {
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  /**
   * Determines if a given rectangle lies within the rectangle.
   *
   * @param {Rectangle | Circle} range Range to check.
   * @returns Whether the rectangle lies within the rectangle.
   */
  intersects(range: Rectangle | Circle) {
    if (range instanceof Rectangle) {
      let xDist = Math.abs(range.x - this.x);
      let yDist = Math.abs(range.y - this.y);

      let r = this.radius;

      let w = range.width;
      let h = range.height;

      let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

      if (xDist > (r + w) || yDist > (r + h)) {
        return false;
      }
          
      if (xDist <= w || yDist <= h) {
        return true;
      }
          
      return edges <= this.rSquared;
    } else {
      const xDiffSquared = Math.pow((range.x - this.x), 2);
      const yDiffSquared = Math.pow((range.y - this.y), 2);
      const radiusCombined = this.radius + range.radius;

      return Math.sqrt(xDiffSquared + yDiffSquared) <= radiusCombined;
    }
  }

  /**
   * Returns a string representation of the circle.
   *
   * @returns {string} String representation of the circle.
   */
  getId() {
    return `circ-${this.x}-${this.y}-${this.radius}`;
  }

  /**
   * Whether this Cirlce equals another.
   *
   * @param {Cirlce} other Other circle to compare.
   * @returns {boolean} Whether this circle equals the other.
   */
  equals(other: Circle): boolean {
    return (this.x === other.x
      && this.y === other.y
      && this.radius === other.radius);
  }
}
