"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesh = void 0;
/**
 * A mesh is a collection of vertices and faces to create a 3D object.
 */
var Mesh = /** @class */ (function () {
    function Mesh() {
        this._verticies = [];
        this._faces = [];
    }
    /**
     * Generates faces based on verticies.
     */
    Mesh.prototype.generateFace = function () {
    };
    /**
     * Retreives the Mesh's verticies.
     *
     * @returns {Vector3[]} Verticies making up the Mesh.
     */
    Mesh.prototype.getVerticies = function () {
        return this._verticies;
    };
    /**
     * Retreives the Mesh's verticies flattened.
     *
     * @returns {Vector3[]} Verticies making up the Mesh flattened.
     */
    Mesh.prototype.getVerticiesFlattened = function () {
        return this._verticies.map(function (vertex) { return [
            vertex.x,
            vertex.y,
            vertex.z,
        ]; }).flat();
    };
    /**
     * Retrieves the Mesh's faces.
     *
     * @returns {Face[]} Faces making up the Mesh.
     */
    Mesh.prototype.getFaces = function () {
        return this._faces;
    };
    /**
     * Retrieves the Mesh's faces flattened.
     *
     * @returns {number[]} Faces making up the Mesh flattened.
     */
    Mesh.prototype.getFacesFlattened = function () {
        return this._faces.map(function (face) { return face.getVertexIndices(); }).flat();
    };
    return Mesh;
}());
exports.Mesh = Mesh;
//# sourceMappingURL=mesh.js.map