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
var POLAR_GRID_RECTANGLE = new rectangle_1.Rectangle(-180, -90, 360, 180);
var QUAD_TREE_MAX_POINTS = 10;
var Globe = /** @class */ (function () {
    function Globe() {
        this._highestDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._highDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._mediumDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._lowDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._lowestDefinitionPolygons = new quadtree_1.QuadTree(POLAR_GRID_RECTANGLE, QUAD_TREE_MAX_POINTS);
        this._polygons = {};
    }
    Globe.prototype.initialize = function () {
        for (var i = 0; i < 5; i += 1) {
            this._loadData(i);
        }
    };
    Globe.prototype._loadData = function (resolution) {
        return __awaiter(this, void 0, void 0, function () {
            var dataLoader, gshhs, n, i, point, quadTreePoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataLoader = new gshhg_reader_1.default(resolution);
                        return [4 /*yield*/, dataLoader.loadFile()];
                    case 1:
                        _a.sent();
                        do {
                            gshhs = dataLoader.getNextGSHHS();
                            n = dataLoader.getNumberPointsUnread();
                            for (i = 0; i < n; i += 1) {
                                point = dataLoader.getNextGSHHSPoint();
                                quadTreePoint = new point_1.Point(point.x, point.y, gshhs.id);
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
                        console.log("Finished Loading Polygons for Resolution ".concat(resolution));
                        return [2 /*return*/];
                }
            });
        });
    };
    Globe.prototype.getPolygons = function (resolution, rectangle) {
        var _this = this;
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
        return points.map(function (point) {
            return _this._polygons[_this._getPolygonKey(resolution, point.data)];
        });
    };
    Globe.prototype._getPolygonKey = function (resolution, id) {
        return "".concat(resolution, "-").concat(id);
    };
    return Globe;
}());
exports.default = Globe;
//# sourceMappingURL=globe.js.map