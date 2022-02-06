// Local Imports
import { PolygonLevels } from './config';
import { PolygonLevel } from './types';
import { Vector2 } from '../../structures/primitives/2d/vector-2';

export class Polygon {
  /**
   * Unique polygon ID.
   */
  _id: string;

  /**
   * Number of points in this polygon.
   */
  _n: number;

  /**
   * Level of decomposition.
   */
  _level: PolygonLevel;

  /**
   * Greenwich is crossed.
   */
  _greenwich: boolean;

  /**
   * Min/max extent in micro-degrees.
   */
  _west: number;

  /**
   * Min/max extent in micro-degrees.
   */
  _east: number;

  /**
   * Min/max extent in micro-degrees.
   */
  _south: number;

  /**
   * Min/max extent in micro-degrees.
   */
  _north: number;

  /**
   * Area of polygon in 1/10 km^2
   */
  _area: number;

  /**
   * Area of original full-resolution polygon in 1/10 km^2
   */
  _areaFull: number;

  /**
   * Polygon that encloses this polygon (null if none)
   */
  _parent: Polygon | null;

  /**
   * Children Polygons.
   */
  _children: Polygon[];

  /**
   * Each Vertex on the Polygon.
   */
  _verticies: Vector2[];

  constructor(
    id: string,
    n: number = 0,
    level: PolygonLevel = PolygonLevels.LAND,
    greenwich: boolean = false,
    west: number = 0,
    east: number = 0,
    south: number = 0,
    north: number = 0,
    area: number = 0,
    areaFull: number = 0,
    parent: Polygon | null = null,
    verticies: Vector2[] = []
  ) {
    this._id = id;
    this._n = n;
    this._level = level;
    this._greenwich = greenwich;
    this._west = west;
    this._east = east;
    this._south = south;
    this._north = north;
    this._area = area;
    this._areaFull = areaFull;
    this._parent = parent;
    this._verticies = verticies;
  }

  /**
   * Retrieves unique polygon ID.
   *
   * @returns {string} Unique polygon ID.
   */
  getId(): string {
    return this._id;
  }

  /**
   * Retrieves the number of verticies in this polygon.
   *
   * @returns {number} Number of verticies in this polygon.
   */
  getNumberOfVerticies(): number {
    return this._n;
  }

  /**
   * Retrieves polygon level of decomposition.
   *
   * @returns {PolygonLevel} Polygon level of decomposition
   */
  getLevel(): PolygonLevel {
    return this._level;
  }

  /**
   * Retrieves whether the polygon crosses greenwich.
   *
   * @returns {boolean} Whether the polygon crosses greenwich.
   */
  crossesGreenwich(): boolean {
    return this._greenwich;
  }

  /**
   * Retrieves min/max western extent in micro-degrees.
   *
   * @returns {number} Min/max western extent in micro-degrees.
   */
  getWestExtent(): number {
    return this._west;
  }

  /**
   * Retrieves min/max eastern extent in micro-degrees.
   *
   * @returns {number} Min/max eastern extent in micro-degrees.
   */
  getEastExtent(): number {
    return this._east;
  }

  /**
   * Retrieves min/max southern extent in micro-degrees.
   *
   * @returns {number} Min/max southern extent in micro-degrees.
   */
  getSouthExtent(): number {
    return this._south;
  }

  /**
   * Retrieves min/max northern extent in micro-degrees.
   *
   * @returns {number} Min/max northern extent in micro-degrees.
   */
  getNorthExtent(): number {
    return this._north;
  }

  /**
   * Retrieves the area of the Polygon based on its resolution.
   *
   * @returns {number} Area of the Polygon based on its resolution.
   */
  getResolutionArea(): number {
    return this._area;
  }

  /**
   * Retrieves full definition area of the Polygon.
   *
   * @returns {number} Full definition area of the Polygon.
   */
  getArea(): number {
    return this._areaFull;
  }

  /**
   * Sets parent Polygon.
   *
   * @param {Polygon | null} parent Parent polygon.
   */
  setParent(parent: Polygon | null): void {
    this._parent = parent;
  }

  /**
   * Retrieves the parent Polygon.
   *
   * @returns {Polygon | null} Parent polygon.
   */
  getParent(): Polygon | null {
    return this._parent;
  }

  /**
   * Sets Polygon children.
   *
   * @param {Polygon[]} children Children of the Polygon.
   */
  setChildren(children: Polygon[]): void {
    this._children = children;
  }

  /**
   * Appends a child to the Polygon.
   *
   * @param {Polygon} child Child to be appended.
   */
  appendChild(child: Polygon): void {
    this._children.push(child);
  }

  /**
   * Retrieves all children of the Polygon.
   *
   * @returns {Polygon[]} Children of the Polygon.
   */
  getChildren(): Polygon[] {
    return this._children;
  }

  /**
   * Sets verticies of Polygon.
   *
   * @param {Vector2[]} verticies Verticies of the Polygon.
   */
  setVerticies(verticies: Vector2[]): void {
    this._verticies = verticies;
  }

  /**
   * Appends a vertex to the Polygon.
   *
   * @param {Vector2} vertex Vertext to be appended.
   */
  appendVertex(vertex: Vector2): void {
    this._verticies.push(vertex);
  }

  /**
   * Retrieves all verticies of the Polygon.
   *
   * @returns {Vector2[]} Verticies of the Polygon.
   */
  getVerticies(): Vector2[] {
    return this._verticies;
  }
}
