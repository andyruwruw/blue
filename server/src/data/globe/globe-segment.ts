// Local Imports
import { GeologicalFeature } from './geological-feature';
import { Rectangle } from '../../structures/primitives/2d/rectangle';

/**
 * Defines a spherical segement on the globe. Treated as rectangle.
 */
export class GlobeSegment {
  /**
   * Rectangle defining the boundary of the GlobeSegment.
   */
  _boundary: Rectangle;

  /**
   * Geographical features within the GlobeSegment.
   */
  _geographicalFeatures: GeologicalFeature[];

  /**
   * Instantiates a new GlobeSegment.
   *
   * @param {Rectangle} boundary Rectangle defining the boundary of the GlobeSegment.
   * @param {GeologicalFeature[]} geographicalFeatures Geographical features within the GlobeSegment.
   */
  constructor(
    boundary: Rectangle,
    geographicalFeatures: GeologicalFeature[] = [],
  ) {
    this._boundary = boundary;
    this._geographicalFeatures = geographicalFeatures;
  }
}
