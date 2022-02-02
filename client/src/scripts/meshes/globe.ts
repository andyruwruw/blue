import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

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
