// Local Imports
import GSHHGReader from '../../helpers/gshhg-reader';
import { QuadTree } from '../array/quadtree';
import { Rectangle } from '../primitives/rectangle';
import { Point } from '../primitives/point';
import { GSHHG_RESOLUTION_RANGES } from '../../config';

// Types
import { GSHHG, GSHHGPoint } from '../../types';

/**
 * Overall boundary for globe QuadTree.
 */
const POLAR_GRID_RECTANGLE = new Rectangle(-180, -90, 360, 180);

/**
 * Max number of points per QuadTree subdivision.
 */
const QUAD_TREE_MAX_POINTS = 10;

class Globe {
  /**
   * Quadtree containing highest definition GSHHG polygons.
   */
  _highestDefinitionPolygons: QuadTree;

  /**
   * Quadtree containing high definition GSHHG polygons.
   */
  _highDefinitionPolygons: QuadTree;

  /**
   * Quadtree containing medium definition GSHHG polygons.
   */
  _mediumDefinitionPolygons: QuadTree;

  /**
   * Quadtree containing low definition GSHHG polygons.
   */
  _lowDefinitionPolygons: QuadTree;

  /**
   * Quadtree containing lowest definition GSHHG polygons.
   */
  _lowestDefinitionPolygons: QuadTree;

  /**
   * Collection of polygon objects.
   */
  _polygons: Record<string, GSHHG>;

  /**
   * Initializes the Globe with various QuadTrees at different definitions.
   */
  constructor() {
    this._highestDefinitionPolygons = new QuadTree(
      POLAR_GRID_RECTANGLE,
      QUAD_TREE_MAX_POINTS,
    );
    this._highDefinitionPolygons = new QuadTree(
      POLAR_GRID_RECTANGLE,
      QUAD_TREE_MAX_POINTS,
    );
    this._mediumDefinitionPolygons = new QuadTree(
      POLAR_GRID_RECTANGLE,
      QUAD_TREE_MAX_POINTS,
    );
    this._lowDefinitionPolygons = new QuadTree(
      POLAR_GRID_RECTANGLE,
      QUAD_TREE_MAX_POINTS,
    );
    this._lowestDefinitionPolygons = new QuadTree(
      POLAR_GRID_RECTANGLE,
      QUAD_TREE_MAX_POINTS,
    );
    this._polygons = {};
  }

  /**
   * Intializes the QuadTrees with the GSHHG data.
   */
  initialize() {
    for (let i = 0; i < 5; i += 1) {
      this._loadData(i);
    }
  }

  /**
   * Loads file data for a specific resolution.
   *
   * @param {number} resolution Desired resolution of detail.
   */
  async _loadData(resolution: number) {
    const dataLoader = new GSHHGReader(resolution);
    await dataLoader.loadFile();

    do {
      await this._loadGSHHS(
        resolution,
        dataLoader,
      );
    } while (dataLoader.hasNext());

    console.log(`Finished Loading Polygons for Resolution ${resolution}`);
  }

  /**
   * Loads the next GSHHG polygon for a given resolution.
   *
   * @param {number} resolution Desired resolution of detail.
   * @param {GSHHGReader} dataLoader GSHHG data loader.
   */
  async _loadGSHHS(
    resolution: number,
    dataLoader: GSHHGReader,
  ) {
    // Get the next GSHHS.
    const gshhs = await dataLoader.getNextGSHHS();

    // Get all points in GSHHS
    const n = dataLoader.getNumberPointsUnread();
    const points = await  this._getGSHHGPoints(
      n,
      dataLoader,
    );

    // Subdivide based on range.
    const polygons = await  this._subdivideGSHHG(
      resolution,
      gshhs,
      points,
    );
    
    // for (let i = 0; i < n; i += 1) {
    //   const quadTreePoint = new Point(point.x, point.y, gshhs.id);
    //   switch (resolution) {
    //     case 0:
    //       this._lowestDefinitionPolygons.insert(quadTreePoint);
    //       break;
    //     case 1:
    //       this._lowDefinitionPolygons.insert(quadTreePoint);
    //       break;
    //     case 2:
    //       this._mediumDefinitionPolygons.insert(quadTreePoint);
    //       break;
    //     case 3:
    //       this._highDefinitionPolygons.insert(quadTreePoint);
    //       break;
    //     case 4:
    //       this._highestDefinitionPolygons.insert(quadTreePoint);
    //       break;
    //   }
    // }

    // this._polygons[this._getPolygonKey(resolution, gshhs.id)] = gshhs;
  }

  /**
   * Loads GSHHGPoints for a given GSHHG.
   *
   * @param {number} n Number of points to load.
   * @param {GSHHGReader} dataLoader GSHHG data loader.
   * @returns 
   */
  _getGSHHGPoints(
    n: number,
    dataLoader: GSHHGReader,
  ): GSHHGPoint[] {
    const points = [];

    // Gather all the points.
    for (let i = 0; i < n; i += 1) {
      points.push(dataLoader.getNextGSHHSPoint());
    }

    return points;
  }

  /**
   * Subdivides a GSHHG into smaller polygons.
   *
   * @param {number} resolution Desired resolution of detail.
   * @param {GSHHG} gshhs GSHHG header data for a given polygon.
   * @param {GSHHGPoint[]} points Array of GSHHG points for given polygon.
   * @returns 
   */
  _subdivideGSHHG(
    resolution: number,
    gshhs: GSHHG,
    points: GSHHGPoint[],
  ): GSHHG[] {
    // We need to find the start of a new range.
    const start = this._getFirstNewRangeIndex(points, resolution);

    // Polygons that have been cropped to fit in range.
    const subPolygons: GSHHG[] = [];

    const currentRange = this._getRangeKey(
      points[start].x,
      points[start].y,
      resolution,
    );
    const currentPolygon = this._createSubGSHHG(
      gshhs,
      subPolygons.length,
    );

    for (let i = 0; i < points.length; i += 1) {
      const index = (i + start) % points.length;

      if (currentRange !== this._getRangeKey(
        points[index].x,
        points[index].y,
        resolution,
      )) {
        let next = points[(index + 1) % points.length];
        // Close subpolygon
        // Make new subpolygon
      } else {
        let previous = points[(index + points.length - 1) % points.length];
      }

      const point = points[index];
    }

    return subPolygons;
  }

  getPolygons(
    resolution: number,
    rectangle: Rectangle,
  ): GSHHG[] {
    let points: Point[] = null;

    switch (resolution) {
      case 0:
        points = this._lowestDefinitionPolygons.query(rectangle);
        break;
      case 1:
        points = this._lowDefinitionPolygons.query(rectangle);
        break;
      case 2:
        points = this._mediumDefinitionPolygons.query(rectangle);
        break;
      case 3:
        points = this._highDefinitionPolygons.query(rectangle);
        break;
      case 4:
        points = this._highestDefinitionPolygons.query(rectangle);
        break;
    }

    return points.map((point) => {
      return this._polygons[this._getPolygonKey(resolution, point.data)];
    });
  }

  /**
   * Generates a key for a given polygon.
   *
   * @param {number} resolution Desired resolution of detail.
   * @param id ID of the polygon.
   * @returns {string} Key for polygon.
   */
  _getPolygonKey(resolution: number, id: string): string {
    return `${resolution}-${id}`
  }

  /**
   * Generates a key for a given range.
   *
   * @param {number} longitude Longitude of a point in the range.
   * @param {number} latitude Latitude of a point in the range.
   * @param {number} resolution Desired resolution of detail.
   * @returns {string} Key for range.
   */
  _getRangeKey(
    longitude: number,
    latitude: number,
    resolution: number,
  ): string {
    const range = GSHHG_RESOLUTION_RANGES[resolution];

    const longitudeStart = Math.floor(longitude / range.longitude);
    const latitudeStart = Math.floor(latitude / range.latitude);

    return `${longitudeStart}-${latitudeStart}`;
  }

  /**
   * Finds the first point in a new range.
   *
   * @param {GSHHGPoint[]} points Array of GSHHS points.
   * @param {number} resolution Desired resolution of detail.
   * @returns {number} Index of the first point in a new range.
   */
  _getFirstNewRangeIndex(
    points: GSHHGPoint[],
    resolution: number,): number {
    let start = 0;

    const firstRange = this._getRangeFromPoint(
      points[start],
      resolution,
    );
    let currentRange = firstRange;
    
    while (firstRange.equals(currentRange)) {
      start = (start + 1) % points.length;

      currentRange = this._getRangeFromPoint(
        points[start],
        resolution,
      );
    }

    return start;
  }

  /**
   * Creates a subpolygon GSHHG header.
   *
   * @param {GSHHG} gshhs Parent GSHHG header.
   * @param {number} index Index of the subpolygon.
   * @returns {GSHHG} Subpolygon GSHHG header.
   */
  _createSubGSHHG(
    gshhs: GSHHG,
    index: number,
  ) {
    return {
      id: `${gshhs.id}-${index}`,
      n: 0,
      level: gshhs.level,
      version: gshhs.version,
      greenwich: gshhs.greenwich,
      source: gshhs.source,
      west: gshhs.west,
      east: gshhs.east,
      south: gshhs.south,
      north: gshhs.north,
      area: gshhs.area,
      areaFull: gshhs.areaFull,
      container: gshhs.container,
      ancestor: gshhs.ancestor,
      points: [] as GSHHGPoint[],
    }
  }

  /**
   * Returns rectangle range of a give point at a given resolution.
   *
   * @param {GSHHGPoint} point Point to get range for.
   * @param {number} resolution Desired resolution of detail.
   * @returns {Rectangle} Rectangle range of point.
   */
  _getRangeFromPoint(
    point: GSHHGPoint,
    resolution: number,
  ): Rectangle {
    const range = GSHHG_RESOLUTION_RANGES[resolution];

    const longitudeStart = Math.floor(point.x / range.longitude);
    const latitudeStart = Math.floor(point.y / range.latitude);

    return new Rectangle(
      longitudeStart + range.longitude / 2,
      latitudeStart + range.latitude / 2,
      range.longitude,
      range.latitude,
    );
  }

  /**
   * 
   * @param point1 
   * @param point2 
   */
  _getRangeIntersection(
    point1: GSHHGPoint,
    point2: GSHHGPoint,
    range: Rectangle,
  ): GSHHGPoint {

  }
}

export default Globe;
