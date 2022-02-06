// Local Imports
import { Node } from './node';
import { Circle } from '../primitives/2d/circle';
import { Rectangle } from '../primitives/2d/rectangle';

/**
 * Defines a set of spacially queriable data.
 */
export class QuadTree {
  /**
   * Bounding box of the QuadTree.
   */
  _boundary: Rectangle;

  /**
   * Maximum number of nodes per subdivision.
   */
  _capacity: number;

  /**
   * Nodes within this subdivision.
   */
  _nodes: Node[];

  /**
   * Whether this QuadTree has been subdivided.
   */
  _divided: boolean;

  /**
   * Top-right subdivision.
   */
  _topRightQuadrant: QuadTree;

  /**
   * Top-left subdivision.
   */
  _topLeftQuadrant: QuadTree;

  /**
   * Bottom-right subdivision.
   */
  _bottomRightQuadrant: QuadTree;

  /**
   * Bottom-left subdivision.
   */
  _bottomLeftQuadrant: QuadTree;

  /**
   * Instantiates a new QuadTree with a given boundary.
   *
   * @param {Rectangle} boundary Bounding box of the QuadTree.
   * @param {number} capacity Maximum number of nodes per subdivision.
   */
  constructor(boundary: Rectangle, capacity: number) {
    this._boundary = boundary;
    this._capacity = capacity;
    this._nodes = [];
    this._divided = false;
    this._topRightQuadrant = null;
    this._topLeftQuadrant = null;
    this._bottomRightQuadrant = null;
    this._bottomLeftQuadrant = null;
  }

  /**
   * Inserts a new node into the QuadTree.
   *
   * @param {Node} node Node to insert.
   * @returns {boolean} Whether the node was inserted.
   */
  insert(node: Node): boolean {
    if (!this._boundary.contains(node.getPosition())) {
      return false;
    }

    if (this._nodes.length < this._capacity) {
      this._nodes.push(node);
      return true;
    }

    if (!this._divided) {
      this._subdivide();
    }

    return (this._topRightQuadrant.insert(node)
      || this._topLeftQuadrant.insert(node)
      || this._bottomRightQuadrant.insert(node)
      || this._bottomLeftQuadrant.insert(node));
  }

  /**
   * Finds all nodes within a given range.
   *
   * @param {Cirlce | Rectangle} range The range to query.
   * @param {Node[]} found Nodes found within the range.
   */
  query(
    range: Circle | Rectangle,
    found: Node[] = [],
  ): void {
    if (!range.intersects(this._boundary)) {
      return;
    }

    for (let node of this._nodes) {
      if (range.contains(node.getPosition())) {
        found.push(node);
      }
    }

    if (this._divided) {
      this._topLeftQuadrant.query(range, found);
      this._topRightQuadrant.query(range, found);
      this._bottomLeftQuadrant.query(range, found);
      this._bottomRightQuadrant.query(range, found);
    }
  }

  /**
   * Runs a function on each Node in the QuadTree.
   *
   * @param {Function} fn Function to run on each Node. 
   */
  forEach(fn: (node: Node) => void): void {
    this._nodes.forEach(fn);

    if (this._divided) {
      this._topRightQuadrant.forEach(fn);
      this._topLeftQuadrant.forEach(fn);
      this._bottomRightQuadrant.forEach(fn);
      this._bottomLeftQuadrant.forEach(fn);
    }
  }

  /**
   * Retrieves the QuadTree's boundary.
   *
   * @returns {Rectangle} QuadTree's boundary.
   */
  getBoundary(): Rectangle {
    return this._boundary;
  }

  /**
   * Retrieves the number of Nodes in the QuadTree.
   *
   * @returns {number} The number of Nodes in the QuadTree.
   */
  getLength(): number {
    let count = this._nodes.length;

    if (this._divided) {
      count += this._topLeftQuadrant.getLength();
      count += this._topRightQuadrant.getLength();
      count += this._bottomLeftQuadrant.getLength();
      count += this._bottomRightQuadrant.getLength();
    }

    return count;
  }

  /**
   * Subdivides the QuadTree into quadrants.
   */
  _subdivide(): void {
    this._topRightQuadrant = new QuadTree(
      this._boundary.getTopRightQuadrant(),
      this._capacity,
    );
    this._topLeftQuadrant = new QuadTree(
      this._boundary.getTopLeftQuadrant(),
      this._capacity,
    );
    this._bottomRightQuadrant = new QuadTree(
      this._boundary.getBottomRightQuadrant(),
      this._capacity,
    );
    this._bottomLeftQuadrant = new QuadTree(
      this._boundary.getBottomLeftQuadrant(),
      this._capacity,
    );

    this._divided = true;
  }
}