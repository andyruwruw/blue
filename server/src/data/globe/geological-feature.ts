// Local Imports
import { Polygon } from '../../structures/primitives/2d/polygon';

/**
 * Represents a geological feature on the globe, defined by a Polygon.
 */
export class GeologicalFeature {
  /**
   * Unique geological feature ID.
   */
  _id: string;

  /**
   * Polygon outline of the geological feature.
   */
  _polygon: Polygon;

  /**
   * Instantiates a new GeologicalFeature.
   *
   * @param {Polygon} polygon Polygon outline for the geological feature.
   */
  constructor(
    id: string,
    polygon: Polygon,
  ) {
    this._id = id;
    this._polygon = polygon;
  }

  /**
   * Retrieves the unique geological feature ID.
   *
   * @returns {string} Unique geological feature ID.
   */
  getId(): string {
    return this._id;
  }

  /**
   * Retrieves the Polygon outline of the geological feature.
   *
   * @returns {Polgyon} Polygon outline of the geological feature.
   */
  getPolygon() {
    return this._polygon;
  }
}
