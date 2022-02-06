// Local Imports
import { Vector2 } from './2d/vector-2';
import { Vector3 } from './3d/vector-3';

/**
 * Represents an area defined by a polygon.
 */
export class Range {
  /**
   * Anchoring position for the range.
   */
  _anchor: Vector2 | Vector3;

  /**
   * Instantiates a new range.
   *
   * @param {Vector2 | Vector3} anchor Anchoring position for the range.
   */
  constructor(anchor: Vector2 | Vector3) {
    this._anchor = anchor;
  }

  /**
   * Determines if a given point lies within the range.
   *
   * @param {Vector2 | Vector3} point Point to check.
   * @returns {boolean} Whether the point lies within the range.
   */
  contains(point: Vector2 | Vector3) {
    return false;
  }

  /**
   * Returns a string representation of the Range.
   *
   * @returns {string} String representation of the Range.
   */
  getId() {
    if (this._anchor instanceof Vector3) {
      return `range-${this._anchor.x}-${this._anchor.y}-${this._anchor.z}`;
    }
    return `range-${this._anchor.x}-${this._anchor.y}`;
  }

  /**
   * Retrieves the Range's anchor.
   *
   * @returns {Vector2 | Vector3} Anchoring position for the range.
   */
  getAnchor(): Vector2 | Vector3 {
    return this._anchor;
  }

  /**
   * Returns whether the range is a 3-dimensional polygon.
   *
   * @returns {boolean} Whether the range is a 3-dimensional polygon.
   */
  is3Dimension(): boolean {
    return this._anchor instanceof Vector3;
  }

  /**
   * Whether this Range equals another.
   *
   * @param {Range} other Other range to compare.
   * @returns {boolean} Whether this range equals the other.
   */
  equals(other: Range): boolean {
    if (this._anchor instanceof Vector3) {
      return (this._anchor.x === other.getAnchor().x
        && this._anchor.y === other.getAnchor().y
        && this._anchor.z === (other.getAnchor() as Vector3).z);
    }
    return (this._anchor.x === other.getAnchor().x
      && this._anchor.y === other.getAnchor().y);
  }
}
