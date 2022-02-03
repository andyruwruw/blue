// Local Imports
import { Point } from './point';
import { Circle } from './circle';

/**
 * Representation of 2D Rectangle centered around it's anchor.
 */
export class Rectangle {
  /**
   * X coordinate of center of rectangle.
   */
  x: number;

  /**
   * Y coordinate of center of rectangle.
   */
  y: number;

  /**
   * Width of rectangle.
   */
  width: number;

  /**
   * Height of rectangle.
   */
  height: number;

  /**
   * Instantiates a new Rectangle centered around anchor.
   *
   * @param {number} x X coordinate of center of rectangle.
   * @param {number} y Y coordinate of center of rectangle.
   * @param {number} width Width of rectangle.
   * @param {number} height Height of rectangle.
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Determines if a given point lies within the rectangle.
   *
   * @param {Point} point Point to check.
   * @returns {boolean} Whether the point lies within the rectangle.
   */
  contains(point: Point) {
    return (point.x >= this.x - this.width &&
      point.x <= this.x + this.width &&
      point.y >= this.y - this.height &&
      point.y <= this.y + this.height);
  }

  /**
   * Determines if a given rectangle lies within the rectangle.
   *
   * @param {Rectangle | Circle} range Range to check.
   * @returns Whether the rectangle lies within the rectangle.
   */
  intersects(range: Rectangle | Circle) {
    if (range instanceof Circle) {
      return (range as Circle).intersects(this);
    } else {
      return !(range.x - range.width > this.x + this.width ||
        range.x + range.width < this.x - this.width ||
        range.y - range.height > this.y + this.height ||
        range.y + range.height < this.y - this.height);
    }
  }

  findIntersectionPoint(point1: Point, point2: Point): Point {
    const contained = this.contains(point1) ? point1 : point2;
    const outside = !this.contains(point1) ? point1 : point2;

    const xDiff = outside.x - contained.x;
    const yDiff = outside.y - contained.y;

    const xRelative = (contained.x - this.x) + xDiff;
    const yRelative = (contained.y - this.y) + yDiff;
    
    
    const lineSlope = (outside.y - contained.y) / (outside.x - contained.x);
  }

  /**
   * Returns a string representation of the rectangle.
   *
   * @returns {string} String representation of the rectangle.
   */
  getId() {
    return `rect-${this.x}-${this.y}-${this.width}-${this.height}`;
  }

  /**
   * Returns X coordinate of left side of the rectangle.
   * 
   * @returns {number} X coordinate of left side of the rectangle.
   */
  getLeftX() {
    return this.x - this.width / 2;
  }

  /**
   * Returns X coordinate of right side of the rectangle.
   * 
   * @returns {number} X coordinate of right side of the rectangle.
   */
  getRightX() {
    return this.x + this.width / 2;
  }

  /**
   * Returns Y coordinate of top side of the rectangle.
   * 
   * @returns {number} Y coordinate of top side of the rectangle.
   */
  getTopY() {
    return this.y - this.height / 2;
  }

  /**
   * Returns Y coordinate of top side of the rectangle.
   * 
   * @returns {number} Y coordinate of top side of the rectangle.
   */
  getBottomY() {
    return this.y + this.height / 2;
  }

  /**
   * Whether this Rectangle equals another.
   *
   * @param {Rectangle} other Other rectangle to compare.
   * @returns {boolean} Whether this rectangle equals the other.
   */
  equals(other: Rectangle): boolean {
    return (this.x === other.x
      && this.y === other.y
      && this.width === other.width
      && this.height === other.height);
  }
}
