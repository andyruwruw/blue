/**
 * Global Self-consistent Hierarchical High-resolution Shorelines (GSHHG) object.
 */
export interface GSHHG {
  /**
   * Unique polygon id number, starting at 0.
   */
  id: string;

  /**
   * Number of points in this polygon.
   */
  n: number;

  /**
   * 1 land, 2 lake, 3 island_in_lake, 4 pond_in_island_in_lake.
   */
  level: number;

  /**
   * Should be 12 for GSHHG release 12 (i.e., version 2.2).
   */
  version: number;

  /**
   * Greenwich is 1 if Greenwich is crossed.
   */
  greenwich: number;

  /**
   * If not level 2, soruce: 0 = CIA WDBII, 1 = WVS, if level 2 river: 0 = not set, 1 = river-lake
   */
  source: number;

  /**
   * Min/max extent in micro-degrees.
   */
  west: number;

  /**
   * Min/max extent in micro-degrees.
   */
  east: number;

  /**
   * Min/max extent in micro-degrees.
   */
  south: number;

  /**
   * Min/max extent in micro-degrees.
   */
  north: number;

  /**
   * Area of polygon in 1/10 km^2
   */
  area: number;

  /**
   * Area of original full-resolution polygon in 1/10 km^2
   */
  areaFull: number;

  /**
   * Id of container polygon that encloses this polygon (-1 if none)
   */
  container: number;

  /**
   * Id of ancestor polygon in the full resolution set that was the source of this polygon (-1 if none)
   */
  ancestor: number;

  /**
   * Each lon, lat pair.
   */
  points: GSHHGPoint[];
}

/**
 * Global Self-consistent Hierarchical High-resolution Shorelines (GSHHG) polygon point object.
 */
export interface GSHHGPoint {
  /**
   * Polar coordinate
   */
  x: number;

  /**
   * Polar coordinate
   */
  y: number;
}

/**
 * Various levels of polygon decomposition.
 */
export type PolygonLevel = 'land' | 'lake' | 'lake-land' | 'lake-land-lake';
