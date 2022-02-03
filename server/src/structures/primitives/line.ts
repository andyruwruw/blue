import { Point } from "./point";

class Line {
  start: Point;

  end: Point;

  constructor(
    start: Point,
    end: Point,
  ) {
    this.start = start;
    this.end = end;
  }

  contains(point: Point) {
    const slopeToStart = (this.start.y - point.y) / (this.start.x - point.x);

    if (slopeToStart !== this.getSlope()) {
      return false;
    }

    const slopeToEnd = (point.y /this.end.y) / (point.x / this.end.x);

    return slopeToEnd === this.getSlope();
  }

  /**
   * Finds the intersection Point of two Lines.
   *
   * @param {Line} other Other line to find intersection with.
   * @returns {Point} Point between the two Lines.
   */
  intersection(other: Line): Point {
    // eslint-disable-next-line max-len
    const x = (-1 * other.getSlope() * other.start.x + other.start.y + this.getSlope() * this.start.x - this.start.y) / (this.getSlope() - other.getSlope());
    const y = this.getSlope() * x - this.getSlope() * this.start.x + this.start.y;

    const point = new Point(x, y, null);

    if (this.contains(point) && other.contains(point)) {
      return point;
    }

    return null;
  }

  getSlope() {
    return (this.start.y - this.end.y) / (this.start.x - this.end.x);
  }
}

export default Line;
