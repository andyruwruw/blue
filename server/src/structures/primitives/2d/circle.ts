// Local Imports
import {
  intersectCircleAndRectangle,
  intersectCircles,
} from '../../../helpers/range';
import { distance2D } from '../../../helpers/coordinates';
import { Range } from '../range';
import { Rectangle } from './rectangle';
import { Vector2 } from './vector-2';


/**
 * Representation of 2D Circle centered around it's anchor.
 */
export class Circle extends Range {
  /**
   * Radius of circle.
   */
  _radius: number;

  /**
   * Pre-calculated radius squared.
   */
  _rSquared: number;

  /**
   * Instantiates a new Circle centered around the anchor.
   *
   * @param {Vector2} anchor Anchoring position for the range.
   * @param {number} radius Radius of circle.
   */
  constructor(
    anchor: Vector2,
    radius: number,
  ) {
    super(anchor);

    this._radius = radius;
    this._rSquared = this._radius * this._radius;
  }

  /**
   * Determines if a given point lies within the range.
   *
   * @param {Vector2} point Point to check.
   * @returns {boolean} Whether the point lies within the range.
   */
  contains(point: Vector2) {
    return distance2D(this._anchor, point) <= this._radius;
  }

  /**
   * Determines if another range lies within or intersects with the range.
   *
   * @param {Range} range Range to check.
   * @returns Whether the range lies within or intersects the rectangle.
   */
  intersects(range: Range) {
    if (range instanceof Rectangle) {
      return intersectCircleAndRectangle(
        this,
        range,
      );
    } else if (range instanceof Circle) {
      if (this.equals(range)) {
        return true;
      }

      return intersectCircles(
        this,
        range,
      );
    }

    return false;
  }

  /**
   * Returns a string representation of the Range.
   *
   * @returns {string} String representation of the Range.
   */
  getId() {
    return `circ-${this._anchor.x}-${this._anchor.y}-${this._radius}`;
  }

  /**
   * Retrieves the radius for the Circle.
   *
   * @returns {number} Radius of the Circle.
   */
  getRadius(): number {
    return this._radius;
  }

  /**
   * Retrieves the radius for the Circle squared.
   *
   * @returns {number} Radius of the Circle squared.
   */
  getRSquared(): number {
    return this._rSquared;
  }

  /**
   * Whether this Range equals another.
   *
   * @param {Range} other Other range to compare.
   * @returns {boolean} Whether this range equals the other.
   */
  equals(other: Range): boolean {
    if (!(other instanceof Circle)) {
      return false;
    }

    return (this._anchor.x === other.getAnchor().x
      && this._anchor.y === other.getAnchor().y);
  }
}
