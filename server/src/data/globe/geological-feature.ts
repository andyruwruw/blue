// Local Imports
import { Polygon } from './polygon';

/**
 * Represents a geological feature on the globe, defined by a Polygon.
 */
export class GeologicalFeature {
  /**
   * Polygon outline of the geological feature.
   */
  _polygon: Polygon;

  constructor(polygon: Polygon) {
    this._polygon = polygon;
  }
}
