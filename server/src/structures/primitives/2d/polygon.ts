// Local Imports
import { Vector2 } from './vector-2';

/**
 * A Polygon is a collection of verticies to create a 2D object.
 */
export class Polygon {
  /**
   * Vertexes making up the Polygon in order of connection.
   */
  _verticies: Vector2[];

  /**
   * Instantiates a new Polygon.
   *
   * @param {Vector2[]} verticies Vertexes making up the Polygon in order of connection.
   */
  constructor(
    verticies: Vector2[] = [],
  ) {
    this._verticies = verticies;
  }
}
