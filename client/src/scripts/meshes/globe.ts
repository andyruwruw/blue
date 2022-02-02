import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';

export const createBase = (): Mesh => {
  const geometry = new SphereGeometry(20, 1000, 1000);
  const texture = (new TextureLoader()).load('./images/EARTH_DISPLACE_42K_16BITS_preview.jpg');
  console.log(texture);
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    displacementMap: texture,
  });
  const object = new Mesh(geometry, material);
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
};

export const placeholder = 0;
