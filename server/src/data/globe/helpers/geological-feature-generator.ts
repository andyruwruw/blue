// Local Imports
import { GraphNode } from '../../../structures/graphs/graph-node';
import { QuadTree } from '../../../structures/graphs/quadtree';
import { Polygon } from '../../../structures/primitives/2d/polygon';
import { Vector2 } from '../../../structures/primitives/2d/vector-2';
import { PrimitiveRange } from '../../../structures/primitives/primitive-range';
import { GSHHG } from '../types';
import { GLOBE_RANGES } from '../config';
import { Rectangle } from '../../../structures/primitives/2d/rectangle';
import GSHHGReader from './gshhg-reader';
import {
  Monitor,
  MonitorLayer,
} from '../../../helpers/monitor';

/**
 * Collects and stores geological features.
 */
export class GeologicalFeatureGenerator {
  /**
   * Desired level of detail.
   */
  _resolution: number;

  /**
   * GSHHSReader for parsing Polygons.
   */
  _gshhsReader: GSHHGReader;

  /**
   * Record of Polygons.
   */
  _polygons: Record<string, Polygon>;

  /**
   * Record of Polygons parents.
   */
  _parents: Record<string, string>;

  /**
   * Polygon queriable via location.
   */
  _polygonLocations: QuadTree;

  /**
   * Whether data is ready to be queried.
   */
  _ready: boolean = false;

  /**
   * Instantiates a new GeologicalFeatureGenerator for parsing GSHHG data.
   *
   * @param {number} resolution Desired level of detail.
   */
  constructor(resolution: number) {
    this._ready = false;
    this._resolution = resolution;

    this._gshhsReader = new GSHHGReader(this._resolution);

    this._polygons = {};
    this._parents = {};
    
    const boundary = new Rectangle(
      new Vector2(
        GLOBE_RANGES.longitude.start + GLOBE_RANGES.longitude.length / 2,
        GLOBE_RANGES.latitude.start + GLOBE_RANGES.latitude.length / 2,
      ),
      GLOBE_RANGES.longitude.length,
      GLOBE_RANGES.latitude.length,
    );
    this._polygonLocations = new QuadTree(
      boundary,
      10,
    );
  }

  /**
   * Loads and processes data.
   */
  async loadData() {
    await this._gshhsReader.loadFile();

    do {
      await this._loadPolygon();
    } while (this._gshhsReader.hasNext());

    await this._generateTree();

    Monitor.log(
      GeologicalFeatureGenerator,
      `Polygons loaded for resolution: ${this._resolution}`,
      MonitorLayer.DEBUG,
    );
  }

  /**
   * Queries for Polygons in a particular PrimitiveRange.
   *
   * @param {PrimitiveRange} range Range to find Polygons.
   * @returns {Polygon[]} Polygons found in the area.
   */
  query(range: PrimitiveRange): Polygon[] {
    const nodes = this._polygonLocations.query(range);

    const polygons = {} as Record<string, Polygon>;

    for (let i = 0; i < nodes.length; i += 1) {
      if (!(nodes[i].getData() in polygons)) {
        polygons[nodes[i].getData()] = this._polygons[nodes[i].getData()];
      }
    }

    return Object.values(polygons);
  }

  /**
   * Loads the next Polygon.
   */
  async _loadPolygon() {
    const gshhs: GSHHG = await this._gshhsReader.getNextGSHHS();

    const points: Vector2[] = this._loadVerticies();

    const additive = gshhs.level % 2 === 0;
    const polygon = new Polygon(
      points,
      additive,
    );

    this._polygons[gshhs.id] = polygon;
    this._parents[gshhs.id] = gshhs.container;
  }

  /**
   * Loads a Polygon's verticies.
   *
   * @returns {Vector2[]} Polygon verticies.
   */
  _loadVerticies(): Vector2[] {
    const points = [] as Vector2[];

    const n = this._gshhsReader.getNumberPointsUnread();

    // Gather all the points.
    for (let i = 0; i < n; i += 1) {
      const point = this._gshhsReader.getNextGSHHSPoint();
      points.push(new Vector2(
        point.x,
        point.y,
      ));
    }

    return points;
  }

  /**
   * Nests children in parent Polygons.
   */
  _generateTree() {
    const polygonKeys = Object.keys(this._polygons);

    for (let i = 0; i < polygonKeys.length; i += 1) {
      const polygon = this._polygons[polygonKeys[i]];
      const parentId = this._parents[polygonKeys[i]];

      if (parentId !== '-1') {
        this._polygons[parentId].appendChild(polygon);
      } else {
        const verticies = polygon.getVerticies();

        for (let j = 0; j < verticies.length; j += 1) {
          this._polygonLocations.insert(new GraphNode(
            verticies[j],
            polygonKeys[i],
          ));
        }
      }
    }

    this._ready = true;
  }
}
