// Local Imports
import { Vector2 } from '../primitives/2d/vector-2';

/**
 * Represents data at a given position.
 */
export class Node {
  /**
   * Position of the node.
   */
  _position: Vector2;

  /**
   * Data the node holds.
   */
  _data: any;

  /**
   * Instantiates a new Node.
   *
   * @param {Vector2} position Initial position of the node.
   * @param {any} data Data the node holds.
   */
  constructor(
    position: Vector2,
    data: any = null,
  ) {
    this._position = position;
    this._data = data;
  }

  /**
   * Retrieves the Node's position.
   *
   * @returns {Vector2} Position of the Node.
   */
  getPosition(): Vector2 {
    return this._position;
  }

  /**
   * Retrieves the attatched data for the Node.
   *
   * @returns {any} Data the Node holds.
   */
  getData(): any {
    return this._data;
  }
}
