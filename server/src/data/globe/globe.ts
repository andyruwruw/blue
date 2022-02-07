// Local Imports
import {
  GLOBE_RANGES,
  GLOBE_RESOLUTION_RANGES,
} from './config';
import { GlobeSegment } from './globe-segment';
import { Rectangle } from '../../structures/primitives/2d/rectangle';
import { Vector2 } from '../../structures/primitives/2d/vector-2';

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
    this._createSegments();
  }

  /**
   * Generates segments for the globe.
   */
  _createSegments() {
    for (let i = 0; i < GLOBE_RESOLUTION_RANGES.length; i += 1) {
      this._segments.push([]);

      const segmentRows = GLOBE_RANGES.latitude.length / GLOBE_RESOLUTION_RANGES[i].latitude;
      const segmentColumns = GLOBE_RANGES.longitude.length / GLOBE_RESOLUTION_RANGES[i].longitude;

      for (let j = 0; j < segmentRows; j += 1) {
        for (let k = 0; k < segmentColumns; k += 1) {
          const width = GLOBE_RESOLUTION_RANGES[i].longitude;
          const height = GLOBE_RESOLUTION_RANGES[i].latitude;

          const boundary = new Rectangle(
            new Vector2(
              GLOBE_RANGES.longitude.start + (k * width) + (width / 2),
              GLOBE_RANGES.latitude.start + (j * height) + (height / 2),
            ),
            width,
            height,
          );

          this._segments[i].push(new GlobeSegment(boundary));
        }
      }
    }
  }
}
