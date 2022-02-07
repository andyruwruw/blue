// Local Imports
import { Vector3 } from '../primitives/3d/vector-3';
import { Face } from './face';

/**
 * A mesh is a collection of vertices and faces to create a 3D object.
 */
export class Mesh {
  /**
   * Verticies making up the mesh.
   */
  _verticies: Vector3[];

  /**
   * Indices of the verticies making up the border of the Mesh's main polygon.
   */
  _border: number[];

  /**
   * Faces making up the Mesh.
   */
  _faces: Face[];

  constructor() {
    this._verticies = [];
    this._faces = [];
  }

  /**
   * Generates faces based on verticies.
   */
  generateFace(): void {

  }

  /**
   * Retreives the Mesh's verticies.
   *
   * @returns {Vector3[]} Verticies making up the Mesh.
   */
  getVerticies(): Vector3[] {
    return this._verticies;
  }

  /**
   * Retreives the Mesh's verticies flattened.
   *
   * @returns {Vector3[]} Verticies making up the Mesh flattened.
   */
  getVerticiesFlattened(): number[] {
    return this._verticies.map((vertex: Vector3) => [
      vertex.x,
      vertex.y,
      vertex.z,
    ]).flat();
  }

  /**
   * Retrieves the Mesh's faces.
   *
   * @returns {Face[]} Faces making up the Mesh.
   */
  getFaces(): Face[] {
    return this._faces;
  }

  /**
   * Retrieves the Mesh's faces flattened.
   *
   * @returns {number[]} Faces making up the Mesh flattened.
   */
  getFacesFlattened(): number[] {
    return this._faces.map((face: Face) => face.getVertexIndices()).flat();
  }
}