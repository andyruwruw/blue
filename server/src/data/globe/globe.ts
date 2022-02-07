// Local Imports
import { GLOBE_RESOLUTION_RANGES } from './config';
import { GlobeSegment } from './globe-segment';
import { createSegments } from './helpers/segment-helper';
import { GeologicalFeatureGenerator } from './helpers/geological-feature-generator';

/**
 * Creates and maintains globe meshes.
 */
export class Globe {
  /**
   * Spherical segments of the globe for each resolution.
   */
  _segments: GlobeSegment[][] = [];

  /**
   * Instantiates a new Globe object for processing meshes.
   */
  constructor() {
    this._segments = [];
  }

  /**
   * Loads and processes data.
   */
  loadData() {
    this._segments = createSegments();

    for (let i = 0; i < GLOBE_RESOLUTION_RANGES.length; i += 1) {
      this._loadResolutionData(i);
    }
  }

  /**
   * Loads and processes data for a specific level of detail.
   *
   * @param {number} resolution Desired level of detail.
   */
  async _loadResolutionData(resolution: number) {
    const geologicalFeatureGenerator = new GeologicalFeatureGenerator(resolution);

    await geologicalFeatureGenerator.loadData();
  }
}
