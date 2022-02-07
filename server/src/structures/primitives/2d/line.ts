// Local Imports
import { Vector2 } from './vector-2';
import { isCounterClockwise } from '../../../helpers/coordinate-helpers';

/**
 * Representation of a line in 2D space.
 */
export class Line {
  /**
   * Starting position of the Line.
   */
  _start: Vector2;

  /**
   * Ending position of the Line.
   */
  _end: Vector2;

  /**
   * Instantiates a new Line from the start to the end.
   *
   * @param {Vector2} start Starting position of the Line.
   * @param {Vector2} end Ending position of the Line.
   */
  constructor(
    start: Vector2,
    end: Vector2,
  ) {
    this._start = start;
    this._end = end;
  }

  /**
   * Whether a point lies within the Line.
   *
   * @param {Vector2} point Point to check.
   * @returns {boolean} Whether the point lies within the Line.
   */
  contains(point: Vector2): boolean {
    const pointToStart = new Line(
      this._start,
      point,
    );
    const pointToEnd = new Line(
      point,
      this._end,
    );

    return pointToStart.getSlope() === pointToEnd.getSlope()
      && point.x >= this._start.x
      && point.x <= this._end.x;
  }

  /**
   * Determines if two lines intersect.
   *
   * @param {Line} other Other line to be tested.
   * @returns {boolean} Whether the two lines intersect.
   */
  intersects(other: Line): boolean {
    return isCounterClockwise(
      this._start,
      other.getStart(),
      other.getEnd(),
    ) !== isCounterClockwise(
      this._end,
      other.getStart(),
      other.getEnd())
    && isCounterClockwise(
      this._start,
      this._end,
      other.getStart(),
    ) !== isCounterClockwise(
      this._start,
      this._end,
      other.getEnd());
  }

  /**
   * Finds the intersection Point of two Lines.
   *
   * @param {Line} other Other line to find intersection with.
   * @returns {Point} Point between the two Lines.
   */
  intersection(other: Line): Vector2 {
    // eslint-disable-next-line max-len
    const x = (-1 * other.getSlope() * other.getStart().x + other.getStart().y + this.getSlope() * this._start.x - this._start.y) / (this.getSlope() - other.getSlope());
    const y = this.getSlope() * x - this.getSlope() * this._start.x + this._start.y;

    const point = new Vector2(
      x,
      y,
    );

    if (this.contains(point) && other.contains(point)) {
      return point;
    }

    return null;
  }

  /**
   * Retrieves the start of the Line.
   *
   * @returns {Vector2} Start of the line.
   */
  getStart(): Vector2 {
    return this._start;
  }

  /**
   * Retrieves the end of the Line.
   *
   * @returns {Vector2} End of the line.
   */
  getEnd(): Vector2 {
    return this._end;
  }

  /**
   * Retrieves the slope of the line.
   *
   * @returns {number} Slope of the line.
   */
  getSlope(): number {
    const yDiff = this._start.y - this._end.y;
    const xDiff = this._start.x - this._end.x;

    return yDiff / xDiff;
  }
}
