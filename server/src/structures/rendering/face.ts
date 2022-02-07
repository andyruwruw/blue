// Local Imports
import { Vector3 } from '../primitives/3d/vector-3';

/**
 * Face of a mesh, or a flat triangle.
 */
export class Face {
  /**
   * Verticies making up the face.
   */
  _vertexIndices: number[];

  /**
   * Instantiates a new face connected to three verticies.
   *
   * @param {number} firstVertexIndex Index of the first vertex making up the face.
   * @param {number} secondVertexIndex Index of the second vertex making up the face.
   * @param {number} thirdVertexIndex Index of the third vertex making up the face.
   */
  constructor(
    firstVertexIndex: number = 0,
    secondVertexIndex: number = 0,
    thirdVertexIndex: number = 0,
  ) {
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
  getVertexIndices(): number[] {
    return this._vertexIndices;
  }

  /**
   * Retrieves verticies from an array of verticies based on index.
   *
   * @param {Vector3[]} verticies Array of verticies in a Mesh.
   * @returns {Vector3[]} Verticies making up the face.
   */
  retrieveVertices(verticies: Vector3[]): Vector3[] {
    return [
      verticies[this._vertexIndices[0]],
      verticies[this._vertexIndices[1]],
      verticies[this._vertexIndices[2]],
    ];
  }
}
