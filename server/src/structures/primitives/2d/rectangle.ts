// Local Imports
import { PrimitiveRange } from '../primitive-range';
import { Circle } from './circle';
import { Line } from './line';
import { Vector2 } from './vector-2';
import { intersectCircleAndRectangle, intersectRectangles } from '../../../helpers/range-helpers';

/**
 * Representation of 2D Rectangle centered around it's anchor.
 */
export class Rectangle extends PrimitiveRange {
  /**
   * Width of rectangle.
   */
  _width: number;

  /**
   * Height of rectangle.
   */
  _height: number;

  /**
   * Instantiates a new Rectangle centered around anchor.
   *
   * @param {Vector2} anchor Anchoring position for the range.
   * @param {number} width Width of Rectangle.
   * @param {number} height Height of Rectangle.
   */
  constructor(
    anchor: Vector2,
    width: number,
    height: number,
  ) {
    super(anchor);

    this._width = width;
    this._height = height;
  }

  /**
   * Determines if a given point lies within the range.
   *
   * @param {Vector2} point Point to check.
   * @returns {boolean} Whether the point lies within the range.
   */
  contains(point: Vector2) {
    return (point.x >= this._anchor.x - this._width &&
      point.x <= this._anchor.x + this._width &&
      point.y >= this._anchor.y - this._height &&
      point.y <= this._anchor.y + this._height);
  }

  /**
   * Determines if a given rectangle lies within the rectangle.
   *
   * @param {PrimitiveRange} range Range to check.
   * @returns Whether the rectangle lies within the rectangle.
   */
  intersects(range: PrimitiveRange) {
    if (range instanceof Circle) {
      return intersectCircleAndRectangle(
        range,
        this,
      );
    } else if (range instanceof Rectangle) {
      if (this.equals(range)) {
        return true;
      }

      return intersectRectangles(
        this,
        range,
      );
    }
  }

  /**
   * Finds the intersection point between the Rectangle's borders and a Line.
   *
   * @param {Line} line Line to be checked.
   * @returns {Vector2 | null} Point at which the Line intersects the Rectangle or null if none.
   */
  findIntersectionPoint(line: Line): Vector2 | null {
    const topIntersection = line.intersection(this.getTopBorder());

    if (topIntersection) {
      return topIntersection;
    }

    const bottomIntersection = line.intersection(this.getBottomBorder());

    if (bottomIntersection) {
      return bottomIntersection;
    }

    const leftIntersection = line.intersection(this.getLeftBorder());

    if (leftIntersection) {
      return leftIntersection;
    }

    const rightIntersection = line.intersection(this.getRightBorder());

    if (rightIntersection) {
      return rightIntersection;
    }

    return null;
  }

  /**
   * Returns a string representation of the rectangle.
   *
   * @returns {string} String representation of the rectangle.
   */
  getId() {
    return `rect-${this._anchor.x}-${this._anchor.y}-${this._width}-${this._height}`;
  }

  /**
   * Retrieves the width of the Rectangle.
   *
   * @returns {number} Width of the Rectangle.
   */
  getWidth() {
    return this._width;
  }

  /**
   * Retrieves the height of the Rectangle.
   *
   * @returns {number} Height of the Rectangle.
   */
  getHeight() {
    return this._height;
  }

  /**
   * Returns X coordinate of left side of the rectangle.
   * 
   * @returns {number} X coordinate of left side of the rectangle.
   */
  getLeftX() {
    return this._anchor.x - this._width / 2;
  }

  /**
   * Returns X coordinate of right side of the rectangle.
   * 
   * @returns {number} X coordinate of right side of the rectangle.
   */
  getRightX() {
    return this._anchor.x + this._width / 2;
  }

  /**
   * Returns Y coordinate of top side of the rectangle.
   * 
   * @returns {number} Y coordinate of top side of the rectangle.
   */
  getTopY() {
    return this._anchor.y - this._height / 2;
  }

  /**
   * Returns Y coordinate of top side of the rectangle.
   * 
   * @returns {number} Y coordinate of top side of the rectangle.
   */
  getBottomY() {
    return this._anchor.y + this._height / 2;
  }

  /**
   * Generates a point representing the top-left corner.
   * 
   * @returns {Vector2} Point representing the top-left corner.
   */
  getTopLeft(): Vector2 {
    return new Vector2(
      this._anchor.x - this._width / 2,
      this._anchor.y + this._height / 2,
    );
  }

  /**
   * Generates a point representing the top-right corner.
   * 
   * @returns {Vector2} Point representing the top-right corner.
   */
  getTopRight(): Vector2 {
    return new Vector2(
      this._anchor.x + this._width / 2,
      this._anchor.y + this._height / 2,
    );
  }

  /**
   * Generates a point representing the bottom-left corner.
   * 
   * @returns {Vector2} Point representing the bottom-left corner.
   */
  getBottomLeft(): Vector2 {
    return new Vector2(
      this._anchor.x - this._width / 2,
      this._anchor.y - this._height / 2,
    );
  }

  /**
   * Generates a point representing the bottom-right corner.
   * 
   * @returns {Vector2} Point representing the bottom-right corner.
   */
  getBottomRight(): Vector2 {
    return new Vector2(
      this._anchor.x + this._width / 2,
      this._anchor.y - this._height / 2,
    );
  }

  /**
   * Generates a Line representing the left border.
   * 
   * @returns {Line} Line representing the left border.
   */
  getLeftBorder(): Line {
    return new Line(
      this.getTopLeft(),
      this.getBottomLeft(),
    );
  }

  /**
   * Generates a Line representing the right border.
   * 
   * @returns {Line} Line representing the right border.
   */
  getRightBorder(): Line {
    return new Line(
      this.getTopRight(),
      this.getBottomRight(),
    );
  }

  /**
   * Generates a Line representing the top border.
   * 
   * @returns {Line} Line representing the top border.
   */
  getTopBorder(): Line {
    return new Line(
      this.getTopLeft(),
      this.getTopRight(),
    );
  }

  /**
   * Generates a Line representing the bottom border.
   * 
   * @returns {Line} Line representing the bottom border.
   */
  getBottomBorder(): Line {
    return new Line(
      this.getBottomLeft(),
      this.getBottomRight(),
    );
  }

  /**
   * Generates a Rectangle representing the top-left quadrant.
   *
   * @returns {Rectangle} Rectangle representing the top-left quadrant.
   */
  getTopLeftQuadrant(): Rectangle {
    return new Rectangle(
      (this._anchor as Vector2).add(new Vector2(
        this._width / -2,
        this._height / 2,
      )),
      this._width / 2,
      this._height / 2,
    );
  }

  /**
   * Generates a Rectangle representing the top-right quadrant.
   *
   * @returns {Rectangle} Rectangle representing the top-right quadrant.
   */
  getTopRightQuadrant(): Rectangle {
    return new Rectangle(
      (this._anchor as Vector2).add(new Vector2(
        this._width / 2,
        this._height / 2,
      )),
      this._width / 2,
      this._height / 2,
    );
  }

  /**
   * Generates a Rectangle representing the bottom-left quadrant.
   *
   * @returns {Rectangle} Rectangle representing the bottom-left quadrant.
   */
  getBottomLeftQuadrant(): Rectangle {
    return new Rectangle(
      (this._anchor as Vector2).add(new Vector2(
        this._width / -2,
        this._height / -2,
      )),
      this._width / 2,
      this._height / 2,
    );
  }

  /**
   * Generates a Rectangle representing the bottom-right quadrant.
   *
   * @returns {Rectangle} Rectangle representing the bottom-right quadrant.
   */
  getBottomRightQuadrant(): Rectangle {
    return new Rectangle(
      (this._anchor as Vector2).add(new Vector2(
        this._width / 2,
        this._height / -2,
      )),
      this._width / 2,
      this._height / 2,
    );
  }

  /**
   * Whether this Rectangle equals another.
   *
   * @param {PrimitiveRange} other Other rectangle to compare.
   * @returns {boolean} Whether this rectangle equals the other.
   */
  equals(other: PrimitiveRange): boolean {
    if (other instanceof Rectangle) {
      return (this._anchor.x === other.getAnchor().x
        && this._anchor.y === other.getAnchor().y
        && this._width === other.getWidth()
        && this._height === other.getHeight());
    }
    return false;
  }
}
