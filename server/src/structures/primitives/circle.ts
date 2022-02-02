// Local Imports
import { Point } from './point';
import { Rectangle } from './rectangle';

export class Circle {
  x: number;

  y: number;

  radius: number;

  rSquared: number;

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

  contains(point: Point) {
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  intersects(range: Rectangle) {
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
  }
}
