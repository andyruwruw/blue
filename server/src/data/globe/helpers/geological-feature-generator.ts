// Local Imports
import { Polygon } from "../../../structures/primitives/2d/polygon";
import GSHHGReader from "./gshhg-reader";

/**
 * Collects and stores geological features.
 */
export class GeologicalFeatureGenerator {
  /**
   * GSHHSReader for parsing Polygons.
   */
  _gshhsReader: GSHHGReader;

  /**
   * Record of Polygons.
   */
  _polygons: Record<string, Polygon>;

  constructor(resolution: number) {
    this._gshhsReader = new GSHHGReader(resolution);
    this._polygons = {};
  }
}
