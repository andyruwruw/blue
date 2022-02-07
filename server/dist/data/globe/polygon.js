"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
// Local Imports
var config_1 = require("./config");
var Polygon = /** @class */ (function () {
    function Polygon(id, n, level, greenwich, west, east, south, north, area, areaFull, parent, verticies) {
        if (n === void 0) { n = 0; }
        if (level === void 0) { level = config_1.PolygonLevels.LAND; }
        if (greenwich === void 0) { greenwich = false; }
        if (west === void 0) { west = 0; }
        if (east === void 0) { east = 0; }
        if (south === void 0) { south = 0; }
        if (north === void 0) { north = 0; }
        if (area === void 0) { area = 0; }
        if (areaFull === void 0) { areaFull = 0; }
        if (parent === void 0) { parent = null; }
        if (verticies === void 0) { verticies = []; }
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
    Polygon.prototype.getId = function () {
        return this._id;
    };
    /**
     * Retrieves the number of verticies in this polygon.
     *
     * @returns {number} Number of verticies in this polygon.
     */
    Polygon.prototype.getNumberOfVerticies = function () {
        return this._n;
    };
    /**
     * Retrieves polygon level of decomposition.
     *
     * @returns {PolygonLevel} Polygon level of decomposition
     */
    Polygon.prototype.getLevel = function () {
        return this._level;
    };
    /**
     * Retrieves whether the polygon crosses greenwich.
     *
     * @returns {boolean} Whether the polygon crosses greenwich.
     */
    Polygon.prototype.crossesGreenwich = function () {
        return this._greenwich;
    };
    /**
     * Retrieves min/max western extent in micro-degrees.
     *
     * @returns {number} Min/max western extent in micro-degrees.
     */
    Polygon.prototype.getWestExtent = function () {
        return this._west;
    };
    /**
     * Retrieves min/max eastern extent in micro-degrees.
     *
     * @returns {number} Min/max eastern extent in micro-degrees.
     */
    Polygon.prototype.getEastExtent = function () {
        return this._east;
    };
    /**
     * Retrieves min/max southern extent in micro-degrees.
     *
     * @returns {number} Min/max southern extent in micro-degrees.
     */
    Polygon.prototype.getSouthExtent = function () {
        return this._south;
    };
    /**
     * Retrieves min/max northern extent in micro-degrees.
     *
     * @returns {number} Min/max northern extent in micro-degrees.
     */
    Polygon.prototype.getNorthExtent = function () {
        return this._north;
    };
    /**
     * Retrieves the area of the Polygon based on its resolution.
     *
     * @returns {number} Area of the Polygon based on its resolution.
     */
    Polygon.prototype.getResolutionArea = function () {
        return this._area;
    };
    /**
     * Retrieves full definition area of the Polygon.
     *
     * @returns {number} Full definition area of the Polygon.
     */
    Polygon.prototype.getArea = function () {
        return this._areaFull;
    };
    /**
     * Sets parent Polygon.
     *
     * @param {Polygon | null} parent Parent polygon.
     */
    Polygon.prototype.setParent = function (parent) {
        this._parent = parent;
    };
    /**
     * Retrieves the parent Polygon.
     *
     * @returns {Polygon | null} Parent polygon.
     */
    Polygon.prototype.getParent = function () {
        return this._parent;
    };
    /**
     * Sets Polygon children.
     *
     * @param {Polygon[]} children Children of the Polygon.
     */
    Polygon.prototype.setChildren = function (children) {
        this._children = children;
    };
    /**
     * Appends a child to the Polygon.
     *
     * @param {Polygon} child Child to be appended.
     */
    Polygon.prototype.appendChild = function (child) {
        this._children.push(child);
    };
    /**
     * Retrieves all children of the Polygon.
     *
     * @returns {Polygon[]} Children of the Polygon.
     */
    Polygon.prototype.getChildren = function () {
        return this._children;
    };
    /**
     * Sets verticies of Polygon.
     *
     * @param {Vector2[]} verticies Verticies of the Polygon.
     */
    Polygon.prototype.setVerticies = function (verticies) {
        this._verticies = verticies;
    };
    /**
     * Appends a vertex to the Polygon.
     *
     * @param {Vector2} vertex Vertext to be appended.
     */
    Polygon.prototype.appendVertex = function (vertex) {
        this._verticies.push(vertex);
    };
    /**
     * Retrieves all verticies of the Polygon.
     *
     * @returns {Vector2[]} Verticies of the Polygon.
     */
    Polygon.prototype.getVerticies = function () {
        return this._verticies;
    };
    return Polygon;
}());
exports.Polygon = Polygon;
//# sourceMappingURL=polygon.js.map