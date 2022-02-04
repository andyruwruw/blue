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
// Local Imports
var gshhg_reader_1 = require("../../helpers/gshhg-reader");
var quadtree_1 = require("../array/quadtree");
var rectangle_1 = require("../primitives/rectangle");
var point_1 = require("../primitives/point");
var config_1 = require("../../config");
var line_1 = require("../primitives/line");
/**
 * Overall boundary for globe QuadTree.
 */
var POLAR_GRID_RECTANGLE = new rectangle_1.Rectangle(-180, -90, 360, 180);
/**
 * Max number of points per QuadTree subdivision.
 */
var QUAD_TREE_MAX_POINTS = 10;
var Globe = /** @class */ (function () {
    /**
     * Initializes the Globe with various QuadTrees at different definitions.
     */
    function Globe() {
        this._test = [];
        this._highestDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._highDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._mediumDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._lowDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._lowestDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._polygons = {};
    }
    /**
     * Intializes the QuadTrees with the GSHHG data.
     */
    Globe.prototype.initialize = function () {
        for (var i = 0; i < 5; i += 1) {
            this._loadData(i);
        }
    };
    /**
     * Loads file data for a specific resolution.
     *
     * @param {number} resolution Desired resolution of detail.
     */
    Globe.prototype._loadData = function (resolution) {
        return __awaiter(this, void 0, void 0, function () {
            var dataLoader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataLoader = new gshhg_reader_1.default(resolution);
                        return [4 /*yield*/, dataLoader.loadFile()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this._loadGSHHS(resolution, dataLoader)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (dataLoader.hasNext()) return [3 /*break*/, 2];
                        _a.label = 5;
                    case 5:
                        console.log("Finished Loading Polygons for Resolution ".concat(resolution));
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads the next GSHHG polygon for a given resolution.
     *
     * @param {number} resolution Desired resolution of detail.
     * @param {GSHHGReader} dataLoader GSHHG data loader.
     */
    Globe.prototype._loadGSHHS = function (resolution, dataLoader) {
        return __awaiter(this, void 0, void 0, function () {
            var gshhs, n, points, polygons, i, quadTreePoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dataLoader.getNextGSHHS()];
                    case 1:
                        gshhs = _a.sent();
                        n = dataLoader.getNumberPointsUnread();
                        return [4 /*yield*/, this._getGSHHGPoints(n, dataLoader)];
                    case 2:
                        points = _a.sent();
                        gshhs.points = points;
                        if (resolution === 0) {
                            this._test.push(gshhs);
                        }
                        polygons = [gshhs];
                        // // Subdivide based on range.
                        // const polygons = await this._subdivideGSHHG(
                        //   resolution,
                        //   gshhs,
                        //   points,
                        // );
                        for (i = 0; i < polygons.length; i += 1) {
                            quadTreePoint = new point_1.Point(polygons[i].points[0].x, polygons[i].points[0].y, this._getPolygonKey(resolution, polygons[i].id));
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
                            this._polygons[this._getPolygonKey(resolution, polygons[i].id)] = polygons[i];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads GSHHGPoints for a given GSHHG.
     *
     * @param {number} n Number of points to load.
     * @param {GSHHGReader} dataLoader GSHHG data loader.
     * @returns
     */
    Globe.prototype._getGSHHGPoints = function (n, dataLoader) {
        var points = [];
        // Gather all the points.
        for (var i = 0; i < n; i += 1) {
            points.push(dataLoader.getNextGSHHSPoint());
        }
        return points;
    };
    /**
     * Subdivides a GSHHG into smaller polygons.
     *
     * @param {number} resolution Desired resolution of detail.
     * @param {GSHHG} gshhs GSHHG header data for a given polygon.
     * @param {GSHHGPoint[]} points Array of GSHHG points for given polygon.
     * @returns
     */
    Globe.prototype._subdivideGSHHG = function (resolution, gshhs, points) {
        // We need to find the start of a new range.
        var start = this._getFirstNewRangeIndex(points, resolution);
        // Polygons that have been cropped to fit in range.
        var subPolygons = [];
        var currentRange = this._getRangeFromPoint(points[start], resolution);
        var currentPolygon = this._createSubGSHHG(gshhs, subPolygons.length);
        for (var i = 0; i < points.length; i += 1) {
            var index = (i + start) % points.length;
            var point = points[index];
            if (!currentRange.equals(this._getRangeFromPoint(point, resolution))) {
                var next = points[(index + 1) % points.length];
                var lineToNext = this._getLineFromTwoGSHHGPoints(point, next);
                var intersectionPoint = currentRange.findIntersectionPoint(lineToNext);
                if (intersectionPoint) {
                    currentPolygon.points.push(this._createGSHHGPoint(intersectionPoint));
                }
                subPolygons.push(currentPolygon);
                currentPolygon = this._createSubGSHHG(gshhs, subPolygons.length);
                currentRange = this._getRangeFromPoint(point, resolution);
                // Big issues here with deciding what corners to include / which side to color.
                // Many strange edge cases.
            }
            if (currentPolygon.points.length === 0) {
                var previous = points[(index + points.length - 1) % points.length];
                var lineToPrevious = this._getLineFromTwoGSHHGPoints(previous, point);
                var intersectionPoint = currentRange.findIntersectionPoint(lineToPrevious);
                if (intersectionPoint) {
                    currentPolygon.points.push(this._createGSHHGPoint(intersectionPoint));
                }
            }
            currentPolygon.points.push(point);
        }
        return subPolygons;
    };
    Globe.prototype.getPolygons = function (resolution, rectangle) {
        var points = null;
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
        var polygons = {};
        for (var i = 0; i < points.length; i += 1) {
            if (!(points[i].data in polygons)) {
                polygons[points[i].data] = this._polygons[points[i].data];
            }
        }
        return Object.values(polygons);
    };
    /**
     * Generates a key for a given polygon.
     *
     * @param {number} resolution Desired resolution of detail.
     * @param id ID of the polygon.
     * @returns {string} Key for polygon.
     */
    Globe.prototype._getPolygonKey = function (resolution, id) {
        return "".concat(resolution, "-").concat(id);
    };
    /**
     * Generates a key for a given range.
     *
     * @param {number} longitude Longitude of a point in the range.
     * @param {number} latitude Latitude of a point in the range.
     * @param {number} resolution Desired resolution of detail.
     * @returns {string} Key for range.
     */
    Globe.prototype._getRangeKey = function (longitude, latitude, resolution) {
        var range = config_1.GSHHG_RESOLUTION_RANGES[resolution];
        var longitudeStart = Math.floor(longitude / range.longitude);
        var latitudeStart = Math.floor(latitude / range.latitude);
        return "".concat(longitudeStart, "-").concat(latitudeStart);
    };
    /**
     * Finds the first point in a new range.
     *
     * @param {GSHHGPoint[]} points Array of GSHHS points.
     * @param {number} resolution Desired resolution of detail.
     * @returns {number} Index of the first point in a new range.
     */
    Globe.prototype._getFirstNewRangeIndex = function (points, resolution) {
        var start = 0;
        var firstRange = this._getRangeFromPoint(points[start], resolution);
        var currentRange = firstRange;
        while (firstRange.equals(currentRange) && start !== points.length - 1) {
            start = (start + 1) % points.length;
            currentRange = this._getRangeFromPoint(points[start], resolution);
        }
        return start;
    };
    /**
     * Creates a subpolygon GSHHG header.
     *
     * @param {GSHHG} gshhs Parent GSHHG header.
     * @param {number} index Index of the subpolygon.
     * @returns {GSHHG} Subpolygon GSHHG header.
     */
    Globe.prototype._createSubGSHHG = function (gshhs, index) {
        return {
            id: "".concat(gshhs.id, "-").concat(index),
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
            points: [],
        };
    };
    Globe.prototype._createGSHHGPoint = function (point) {
        return {
            x: point.x,
            y: point.y,
        };
    };
    /**
     * Returns rectangle range of a give point at a given resolution.
     *
     * @param {GSHHGPoint} point Point to get range for.
     * @param {number} resolution Desired resolution of detail.
     * @returns {Rectangle} Rectangle range of point.
     */
    Globe.prototype._getRangeFromPoint = function (point, resolution) {
        var range = config_1.GSHHG_RESOLUTION_RANGES[resolution];
        var longitudeStart = Math.floor(point.x / range.longitude);
        var latitudeStart = Math.floor(point.y / range.latitude);
        return new rectangle_1.Rectangle(longitudeStart + range.longitude / 2, latitudeStart + range.latitude / 2, range.longitude, range.latitude);
    };
    Globe.prototype._getLineFromTwoGSHHGPoints = function (point1, point2) {
        return new line_1.default(new point_1.Point(point1.x, point1.y), new point_1.Point(point2.x, point2.y));
    };
    return Globe;
}());
exports.default = Globe;
//# sourceMappingURL=globe.js.map