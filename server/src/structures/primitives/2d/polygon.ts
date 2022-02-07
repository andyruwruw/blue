// Local Imports
import { Line } from './line';
import { Vector2 } from './vector-2';

/**
 * A Polygon is a collection of verticies to create a 2D object.
 */
export class Polygon {
  /**
   * Verticies making up the Polygon in order of connection.
   */
  _verticies: Vector2[];

  /**
   * Whether the Polygon defines a filled space.
   */
  _additive: boolean;

  /**
   * Children of the Polygon, defining negative or additive space.
   */
  _children: Polygon[];

  /**
   * Instantiates a new Polygon.
   *
   * @param {Vector2[]} verticies Verticies making up the Polygon in order of connection.
   */
  constructor(
    verticies: Vector2[] = [],
    additive: boolean = true,
    children: Polygon[] = [],
  ) {
    this._verticies = verticies;
    this._additive = additive;
    this._children = children;
  }

  /**
   * Determines if a point lies within the Polygon.
   *
   * @param {Vector2} point Point to be tested.
   * @returns {boolean} Whether the point lies within the Polygon.
   */
  contains(point: Vector2): boolean {
    let intersections = 0;

    let maxX = this._verticies.reduce((max, vertex) => {
      if (vertex.x > max) {
        return vertex.x;
      }
      return max;
    }, -Infinity);

    const ray = new Line(
      point,
      new Vector2(
        maxX * 2,
        point.y,
      ),
    );

    for (let i = 0; i < this._verticies.length; i += 1) {
      if (new Line(
        this._verticies[i],
        this._verticies[(i + 1) % this._verticies.length],
      ).intersects(ray)) {
        intersections += 1;
      }
    }

    return intersections % 2 === 1;
  }

  /**
   * Appends a vertex to the Polygon.
   *
   * @param {Vector2} vertex Vertex to be appended.
   */
  appendVertex(vertex: Vector2) {
    this._verticies.push(vertex);
  }

  /**
   * Retrieves verticies that make up the outline of the Polygon.
   *
   * @returns {Vector2[]} Verticies making up the Polygon in order of connection.
   */
  getVerticies(): Vector2[] {
    return this._verticies;
  }

  /**
   * Retrieves a vertex at a given index.
   *
   * @param {number} index Index of the vertex to be retrieved.
   */
  getVertex(index: number): Vector2 {
    return this._verticies[index];
  }

  /**
   * Retrieves the number of verticies in the Polygon.
   *
   * @returns {number} Number of verticies in the Polygon.
   */
  getLength(): number {
    return this._verticies.length;
  }

  /**
   * Whether the Polygon defines a filled space.
   *
   * @returns {boolean} Whether the Polygon defines a filled space.
   */
  isAdditive(): boolean {
    return this._additive;
  }

  /**
   * Appends a child to the Polygon.
   *
   * @param {Polygon} polygon Child Polygon to be appended.
   */
  appendChild(polygon: Polygon) {
    this._children.push(polygon);
  }

  /**
   * Retrieves the children of the Polygon.
   *
   * @returns {Polygon[]} Children of the Polygon.
   */
  getChildren(): Polygon[] {
    return this._children;
  }
}
