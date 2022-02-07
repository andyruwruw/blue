"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
/**
 * A Polygon is a collection of verticies to create a 2D object.
 */
var Polygon = /** @class */ (function () {
    /**
     * Instantiates a new Polygon.
     *
     * @param {Vector2[]} verticies Vertexes making up the Polygon in order of connection.
     */
    function Polygon(verticies) {
        if (verticies === void 0) { verticies = []; }
        this._verticies = verticies;
    }
    return Polygon;
}());
exports.Polygon = Polygon;
//# sourceMappingURL=polygon.js.map