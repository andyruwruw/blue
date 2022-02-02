// Local Imports
import { Circle } from '../primitives/circle';
import { Point } from '../primitives/point';
import { Rectangle } from '../primitives/rectangle';

/**
 * Defines a 2D array of data queriable by a range.
 */
export class QuadTree {
  boundary: Rectangle;

  capacity: number;

  points: Point[];

  divided: boolean;

  northeast: QuadTree;

  northwest: QuadTree;

  southeast: QuadTree;

  southwest: QuadTree;

  constructor(boundary: Rectangle, capacity: number) {
    if (!boundary) {
      throw TypeError('Boundary is null or undefined.');
    }

    if (!(boundary instanceof Rectangle)) {
      throw TypeError('boundary should be a Rectangle');
    }

    if (typeof capacity !== 'number') {
      throw TypeError(`capacity should be a number but is a ${typeof capacity}`);
    }

    if (capacity < 1) {
      throw RangeError('capacity must be greater than 0');
    }

    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point: Point): boolean {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }
    return (this.northeast.insert(point) || this.northwest.insert(point) ||
    this.southeast.insert(point) || this.southwest.insert(point));
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.width / 2;
    let h = this.boundary.height / 2;

    let ne = new Rectangle(x + w, y, w, h);
    this.northeast = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(x, y, w, h);
    this.northwest = new QuadTree(nw, this.capacity);
    let se = new Rectangle(x + w, y + h, w, h);
    this.southeast = new QuadTree(se, this.capacity);
    let sw = new Rectangle(x, y + h, w, h);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  query(
    range: Circle | Rectangle,
    found: Point[] = [],
  ) {
    if (!found) {
      found = [];
    }

    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }
    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }
    return found;
  }

  closest(
    point: Point,
    count: number,
    maxDistance: number,
  ) {
    if (typeof point === 'undefined') {
      throw TypeError('Method \'closest\' needs a point');
    }
    if (typeof count === 'undefined') {
      count = 1;
    }

    // Limit to number of points in this QuadTree
    if (this.length == 0) {
      return [];
    }
    if (this.length < count) {
      return this.points;
    }

    if (typeof maxDistance === 'undefined') {
    // A circle that contains the entire QuadTree
      const outerReach = Math.sqrt(
          Math.pow(this.boundary.width, 2) + Math.pow(this.boundary.height, 2)
      );
    // Distance of query point from center
      const pointDistance = Math.sqrt(
          Math.pow(point.x, 2) + Math.pow(point.y, 2)
      );
    // One QuadTree size away from the query point
      maxDistance = outerReach + pointDistance;
    }

    // Binary search with Circle queries
    let inner = 0;
    let outer = maxDistance;
    let limit = 8; // Limit to avoid infinite loops caused by ties
    let points;
    while (limit > 0) {
      const radius = (inner + outer) / 2;
      const range = new Circle(point.x, point.y, radius);
      points = this.query(range);
      if (points.length === count) {
        return points; // Return when we hit the right size
      } 
      else if (points.length < count) {
        inner = radius;
      } 
      else {
        outer = radius;
        limit --;
      }
    }
    // Sort by squared distance
    points.sort(
      (a, b) => {
        const aDist = Math.pow(point.x - a.x, 2) +
            Math.pow(point.y - a.y, 2);
        const bDist = Math.pow(point.x - b.x, 2) +
            Math.pow(point.y - b.y, 2);
        return aDist - bDist;
      }
    );
    // Slice to return correct count (breaks ties)
    return points.slice(0, count);
  }

  forEach(fn: (point: Point) => void) {
    this.points.forEach(fn);
    if (this.divided) {
      this.northeast.forEach(fn);
      this.northwest.forEach(fn);
      this.southeast.forEach(fn);
      this.southwest.forEach(fn);
    }
  }

  merge(
    other: QuadTree,
    capacity: number,
  ) {
    let left = Math.min(this.boundary.left, other.boundary.left);
    let right = Math.max(this.boundary.right, other.boundary.right);
    let top = Math.min(this.boundary.top, other.boundary.top);
    let bottom = Math.max(this.boundary.bottom, other.boundary.bottom);
    let height = bottom - top;
    let width = right - left;
    let midX = left + width / 2;
    let midY = top + height / 2;
    let boundary = new Rectangle(midX, midY, width, height);
    let result = new QuadTree(boundary, capacity);
    this.forEach(point => result.insert(point));
    other.forEach(point => result.insert(point));

    return result;
  }

  get length() {
    let count = this.points.length;
    if (this.divided) {
      count += this.northwest.length;
      count += this.northeast.length;
      count += this.southwest.length;
      count += this.southeast.length;
    }
    return count;
  }
}