import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  Vector3,
} from 'three';

export const sunLight = (): DirectionalLight => {
  const light = new DirectionalLight(0xffffff, 10);
  light.position.set(-1, 0, 1);

  light.castShadow = true;
  return light;
};

export const starLight = (): AmbientLight => new AmbientLight(0xffffff, 0.01);
