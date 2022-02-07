// Local Imports
import { GlobeSegment } from './globe-segment';

/**
 * Creates and maintains globe meshes.
 */
export class Globe {
  _segments: GlobeSegment[] = [];

  /**
   * Instantiates a new Globe object for processing meshes.
   */
  constructor() {
    this._segments = [];
  }
}
