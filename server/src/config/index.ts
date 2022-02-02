// Packages
import * as dotenv from 'dotenv';

// Local Imports
import Globe from '../structures/globe/globe';

dotenv.config();

/**
 * Port for API to be served from.
 */
export const PORT = process.env.PORT || 3000;

/**
 * Console message when API is listening and ready.
 */
export const MESSAGE_LISTENING_SUCCESS = `Listening on port ${PORT}`;

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
 * Various ranges for each resolution.
 */
export const GSHHG_RESOLUTION_RANGES = [
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

export const GLOBE = new Globe();
