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
} from 'three';

import { Polygon } from '../../store/modules/globe';

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

export const createLinesFromPolygon = (polygon: Polygon): Line => {
  const points = [];

  const radius = 50;

  for (let i = 0; i < polygon.points.length; i += 1) {
    const radianLongitude = (polygon.points[i].x / 360) * Math.PI * 2;
    const radianLatitude = (polygon.points[i].y / 180) * Math.PI;

    const coordinates = new Vector3(
      -1 * radius * Math.cos(radianLongitude) * Math.cos(radianLatitude),
      radius * Math.cos(radianLongitude) * Math.sin(radianLatitude),
      radius * Math.sin(radianLongitude),
    );

    console.log(polygon.points[i], coordinates);

    points.push(coordinates);
  }

  const geometry = new BufferGeometry().setFromPoints(points);

  const material = new LineBasicMaterial({
    color: 0xffffff,
    linewidth: 1,
    linecap: 'round',
    linejoin: 'round',
  });

  return new Line(geometry, material);
};

export const createBase = (): Mesh => {
  const geometry = new SphereGeometry(20, 1000, 1000);
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

export const placeholder = 0;
