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

  intersection(other: Line) {
    y - this.start.y = this.getSlope() * (x - this.start.x);
    y - other.start.y = this.getSlope() * (x - this.other.x);
  }

  getSlope() {
    return (this.start.y - this.end.y) / (this.start.x - this.end.x);
  }
}

export default Line;
