// Types
import { PolygonLevel } from '../types';

/**
 * Various levels of polygon decomposition.
 */
export const PolygonLevels: Record<string, PolygonLevel> = {
  LAND: 'land',
  LAKE: 'lake',
  ISLAND_IN_LAKE: 'lake-land',
  POND_IN_ISLAND_IN_LAKE: 'lake-land-lake',
};

/**
 * Directory of GSHHG binary files.
 */
export const GSHHG_DIRECTORY_NAME = 'gshhg-bin-2.3.7';

/**
 * File prefix of GSHHG binary files.
 */
export const GSHHG_FILE_POSTFIX = '.b';
 
/**
 * File prefix of GSHHG binary files.
 */
export const GSHHG_FILE_PREFIX = 'gshhs_';

/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) object
 */
export const GSHHG_HALF_BYTE_SIZE = 88;

/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) point.
 */
export const GSSHG_POINT_HALF_BYTE_SIZE = 16;

/**
 * Scale of positional data relative to a degree.
 */
export const GSSHG_POSITION_SCALE = 0.000001;
 
/**
 * Resolution names of GSHHG binary files.
 */
export const GSHHG_RESOLUTION_NAMES = [
  'c',
  'l',
  'i',
  'h',
  'f',
];

/**
 * Range of either axis on the globe.
 */
export const GLOBE_RANGES = {
  longitude: {
    start: -180,
    length: 360,
  },
  latitude: {
    start: -90,
    length: 180,
  },
};

/**
 * Various ranges for each resolution.
 */
export const GLOBE_RESOLUTION_RANGES = [
  {
    longitude: 30,
    latitude: 30,
  },
  {
    longitude: 10,
    latitude: 10,
  },
  {
    longitude: 5,
    latitude: 5,
  },
  {
    longitude: 2,
    latitude: 2,
  },
  {
    longitude: 1,
    latitude: 1,
  },
];
