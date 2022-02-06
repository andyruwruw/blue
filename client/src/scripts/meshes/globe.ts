import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
  PolyhedronGeometry,
  PointsMaterial,
  Points,
  MeshBasicMaterial,
  MeshToonMaterial,
  BufferGeometry,
  LineBasicMaterial,
  Float32BufferAttribute,
  Scene,
  Vector3,
  Line,
  MeshDepthMaterial,
  MeshPhysicalMaterial,
} from 'three';
import { ConvexHull, Face, VertexNode } from 'three/examples/jsm/math/ConvexHull';

import { Polygon } from '../../store/modules/globe';
import {
  longitudeAndLatitudeToCoordinates,
  degreesToRadians,
  rotateAroundXAxis,
} from '../../helpers/polar-coordinates';

export const createMeshFromPolygon = (polygon: Polygon): Points => {
  const vertices: number[] = [];

  const radius = 100;

  for (let i = 0; i < polygon.points.length; i += 1) {
    const x = radius * Math.cos(polygon.points[i].x) * Math.cos(polygon.points[i].y);
    const y = radius * Math.cos(polygon.points[i].x) * Math.sin(polygon.points[i].y);
    const z = radius * Math.sin(polygon.points[i].x);

    vertices.push(x, y, z);
  }

  // const faces: number[] = [];

  // for (let i = 0; i < vertices.length; i += 3) {
  //   faces.push(i);
  //   faces.push(i + 1);
  //   faces.push(i + 2);
  // }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  // const geometry = new PolyhedronGeometry(vertices, faces, 5, 3);

  // const material = new MeshStandardMaterial({ color: 0x888888 });
  // const points = new Mesh(geometry, material);
  const material = new PointsMaterial({ color: 0x888888 });

  const points = new Points(geometry, material);

  return points;
};

export const createLinesFromPolygon = (polygon: Polygon): Mesh => {
  const verticies = [new Vector3(0, 0, 0)];

  const radius = 10;

  for (let i = 0; i < polygon.points.length; i += 1) {
    let coordinates = longitudeAndLatitudeToCoordinates(
      degreesToRadians(polygon.points[i].x),
      degreesToRadians(polygon.points[i].y),
      radius,
    );

    coordinates = rotateAroundXAxis(
      coordinates,
      Math.PI / 2,
    );

    verticies.push(coordinates);
  }

  const faces = [];

  for (let i = 0; i < polygon.points.length; i += 1) {
    faces.push(
      i,
      (i + 1) % polygon.points.length,
      0,
    );
  }

  const geometry = new PolyhedronGeometry(
    verticies.reduce((acc: number[], point: Vector3) => {
      acc.push(point.x, point.y, point.z);
      return acc;
    }, [] as number[]),
    faces,
    10,
    10,
  );

  const material = new MeshBasicMaterial({
    color: '#888888',
  });

  // const geometry = new BufferGeometry().setFromPoints(points);

  // const material = new LineBasicMaterial({
  //   color: 0xffffff,
  //   linewidth: 1,
  //   linecap: 'round',
  //   linejoin: 'round',
  // });

  return new Mesh(geometry, material);
};

export const createBase = (): Mesh => {
  const geometry = new SphereGeometry(9.9, 1000, 1000);
  // const material = new MeshStandardMaterial({
  //   color: 0x0000ff,
  // });
  // const object = new Mesh(geometry, material);
  // return object;
  const displacementTexture = (new TextureLoader()).load('./images/ocean_displacement_00000.png');
  const texture = (new TextureLoader()).load('./images/ocean_colors_00000.png');
  console.log(texture);
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    displacementMap: displacementTexture,
    bumpMap: displacementTexture,
    bumpScale: 0.1,
    displacementScale: 0.1,
    emissiveMap: texture,
    emissiveIntensity: 1000,
    map: texture,
    lightMap: texture,
    lightMapIntensity: 1000,
  });
  const object = new Mesh(geometry, material);
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
};
