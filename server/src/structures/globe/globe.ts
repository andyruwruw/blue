// Local Imports
import GSHHGReader from '../../helpers/gshhg-reader';
import { QuadTree } from '../array/quadtree';
import { Rectangle } from '../primitives/rectangle';

// Types
import { GSHHG } from '../../types';
import { Point } from '../primitives/point';

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
      const gshhs = dataLoader.getNextGSHHS();

      const n = dataLoader.getNumberPointsUnread();

      for (let i = 0; i < n; i += 1) {
        const point = dataLoader.getNextGSHHSPoint();

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

  _getPolygonKey(resolution: number, id: number) {
    return `${resolution}-${id}`
  }
}

export default Globe;
