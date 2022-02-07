"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Face = void 0;
/**
 * Face of a mesh, or a flat triangle.
 */
var Face = /** @class */ (function () {
    /**
     * Instantiates a new face connected to three verticies.
     *
     * @param {number} firstVertexIndex Index of the first vertex making up the face.
     * @param {number} secondVertexIndex Index of the second vertex making up the face.
     * @param {number} thirdVertexIndex Index of the third vertex making up the face.
     */
    function Face(firstVertexIndex, secondVertexIndex, thirdVertexIndex) {
        if (firstVertexIndex === void 0) { firstVertexIndex = 0; }
        if (secondVertexIndex === void 0) { secondVertexIndex = 0; }
        if (thirdVertexIndex === void 0) { thirdVertexIndex = 0; }
        this._vertexIndices = [
            firstVertexIndex,
            secondVertexIndex,
            thirdVertexIndex,
        ];
    }
    /**
     * Retrieves the vertices making up the face.
     *
     * @returns {number[]} Index of the verticies that make up the face.
     */
    Face.prototype.getVertexIndices = function () {
        return this._vertexIndices;
    };
    /**
     * Retrieves verticies from an array of verticies based on index.
     *
     * @param {Vector3[]} verticies Array of verticies in a Mesh.
     * @returns {Vector3[]} Verticies making up the face.
     */
    Face.prototype.retrieveVertices = function (verticies) {
        return [
            verticies[this._vertexIndices[0]],
            verticies[this._vertexIndices[1]],
            verticies[this._vertexIndices[2]],
        ];
    };
    return Face;
}());
exports.Face = Face;
//# sourceMappingURL=face.js.map