"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSHHG_RESOLUTION_RANGES = exports.GSHHG_RESOLUTION_NAMES = exports.GSSHG_POSITION_SCALE = exports.GSSHG_POINT_HALF_BYTE_SIZE = exports.GSHHG_HALF_BYTE_SIZE = exports.GSHHG_FILE_PREFIX = exports.GSHHG_FILE_POSTFIX = exports.GSHHG_DIRECTORY_NAME = exports.PolygonLevels = void 0;
/**
 * Various levels of polygon decomposition.
 */
exports.PolygonLevels = {
    LAND: 'land',
    LAKE: 'lake',
    ISLAND_IN_LAKE: 'lake-land',
    POND_IN_ISLAND_IN_LAKE: 'lake-land-lake',
};
/**
 * Directory of GSHHG binary files.
 */
exports.GSHHG_DIRECTORY_NAME = 'gshhg-bin-2.3.7';
/**
 * File prefix of GSHHG binary files.
 */
exports.GSHHG_FILE_POSTFIX = '.b';
/**
 * File prefix of GSHHG binary files.
 */
exports.GSHHG_FILE_PREFIX = 'gshhs_';
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) object
 */
exports.GSHHG_HALF_BYTE_SIZE = 88;
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) point.
 */
exports.GSSHG_POINT_HALF_BYTE_SIZE = 16;
/**
 * Scale of positional data relative to a degree.
 */
exports.GSSHG_POSITION_SCALE = 0.000001;
/**
 * Resolution names of GSHHG binary files.
 */
exports.GSHHG_RESOLUTION_NAMES = [
    'c',
    'l',
    'i',
    'h',
    'f',
];
/**
 * Various ranges for each resolution.
 */
exports.GSHHG_RESOLUTION_RANGES = [
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
//# sourceMappingURL=index.js.map