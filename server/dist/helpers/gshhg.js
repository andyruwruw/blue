"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readGshhgFile = void 0;
// Packages
var binary_parser_1 = require("binary-parser");
// Local Imports
var files_1 = require("./files");
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) object
 */
var GSHHG_HALF_BYTE_SIZE = 88;
/**
 * Size of Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) point.
 */
var GSSHG_POINT_HALF_BYTE_SIZE = 16;
/**
 * Binary parser for Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) object.
 */
var gshhgParser = new binary_parser_1.Parser()
    .int32be('id')
    .int32be('n')
    .int8('level')
    .int8('version')
    .int8('greenwich')
    .int8('source')
    .int32be('west')
    .int32be('east')
    .int32be('south')
    .int32be('north')
    .int32be('area')
    .int32be('area_full')
    .int32be('container')
    .int32be('ancestor');
/**
 * Binary parser Global Self-Consistent Hierarchical High-Resolution Shoreline (GSHHG) point.
 */
var gshhgPointParser = new binary_parser_1.Parser()
    .int32be('x')
    .int32be('y');
/**
 * Reads GSHHG data from binary file.
 *
 * @param {string} filePath Path to binary file.
 */
var readGshhgFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var data, position, size, GSHHGs, _a, id, n, level, version, greenwich, source, west, east, south, north, area, areaFull, container, ancestor, points, i, point, i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, files_1.readBinaryFile)(filePath)];
            case 1:
                data = _b.sent();
                position = 0;
                size = data.length;
                GSHHGs = [];
                while (position < size) {
                    console.log(position, '/', size);
                    _a = gshhgParser.parse(Buffer.from(data.substring(position, position + GSHHG_HALF_BYTE_SIZE), 'hex')), id = _a.id, n = _a.n, level = _a.level, version = _a.version, greenwich = _a.greenwich, source = _a.source, west = _a.west, east = _a.east, south = _a.south, north = _a.north, area = _a.area, areaFull = _a.area_full, container = _a.container, ancestor = _a.ancestor;
                    position += GSHHG_HALF_BYTE_SIZE;
                    points = [];
                    for (i = 0; i < n; i += 1) {
                        point = gshhgPointParser.parse(Buffer.from(data.substring(position, position + GSSHG_POINT_HALF_BYTE_SIZE), 'hex'));
                        position += GSSHG_POINT_HALF_BYTE_SIZE;
                        points.push({
                            x: point.x * 0.000001,
                            y: point.y * 0.000001,
                        });
                    }
                    GSHHGs.push({
                        id: id,
                        n: n,
                        level: level,
                        version: version,
                        greenwich: greenwich,
                        source: source,
                        west: west * 0.000001,
                        east: east * 0.000001,
                        south: south * 0.000001,
                        north: north * 0.000001,
                        area: area,
                        areaFull: areaFull,
                        container: container,
                        ancestor: ancestor,
                        points: points,
                    });
                }
                for (i = 0; i < GSHHGs.length; i += 1) {
                    console.log(GSHHGs[i]);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.readGshhgFile = readGshhgFile;
//# sourceMappingURL=gshhg.js.map