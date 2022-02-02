// Local Imports
import GSHHGReader from '../../helpers/gshhg-reader';
import { QuadTree } from '../array/quadtree';
import { Rectangle } from '../primitives/rectangle';
import { Point } from '../primitives/point';
import { GSHHG_RESOLUTION_RANGES } from '../../config';

// Types
import { GSHHG, GSHHGPoint } from '../../types';

const POLAR_GRID_RECTANGLE = new Rectangle(-180, -90, 360, 180);

const QUAD_TREE_MAX_POINTS = 10;

class Globe {
  _highestDefinitionPolygons: QuadTree;

  _highDefinitionPolygons: QuadTree;

  _mediumDefinitionPolygons: QuadTree;

  _lowDefinitionPolygons: QuadTree;

  _lowestDefinitionPolygons: QuadTree;

  _polygons: Record<string, GSHHG>;

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

  initialize() {
    for (let i = 0; i < 5; i += 1) {
      this._loadData(i);
    }
  }

  async _loadData(resolution: number) {
    const dataLoader = new GSHHGReader(resolution);
    await dataLoader.loadFile();

    do {
      // Get the next GSHHS.
      const gshhs = dataLoader.getNextGSHHS();

      const n = dataLoader.getNumberPointsUnread();
      const points = [];

      // Gather all the points.
      for (let i = 0; i < n; i += 1) {
        points.push(dataLoader.getNextGSHHSPoint());
      }

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

      for (let i = 0; i < n; i += 1) {
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
      
      for (let i = 0; i < n; i += 1) {

        const quadTreePoint = new Point(point.x, point.y, gshhs.id);
        switch (resolution) {
          case 0:
            this._lowestDefinitionPolygons.insert(quadTreePoint);
            break;
          case 1:
            this._lowDefinitionPolygons.insert(quadTreePoint);
            break;
          case 2:
            this._mediumDefinitionPolygons.insert(quadTreePoint);
            break;
          case 3:
            this._highDefinitionPolygons.insert(quadTreePoint);
            break;
          case 4:
            this._highestDefinitionPolygons.insert(quadTreePoint);
            break;
        }
      }

      this._polygons[this._getPolygonKey(resolution, gshhs.id)] = gshhs;
    } while (dataLoader.hasNext());

    console.log(`Finished Loading Polygons for Resolution ${resolution}`);
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
   * @param resolution Desired resolution of detail.
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

    const firstRange = this._getRangeKey(
      points[0].x,
      points[0].y,
      resolution,
    );
    let currentRange = firstRange;
    
    while (firstRange === currentRange) {
      start = (start + 1) % points.length;

      currentRange =  this._getRangeKey(
        points[start].x,
        points[start].y,
        resolution,
      );
    }

    return start;
  }

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
