import { AmbientLight, DirectionalLight } from 'three';

export const sunLight = (): DirectionalLight => {
  const light = new DirectionalLight(0xffffff, 0.5);
  light.castShadow = true;
  return light;
};

export const starLight = (): AmbientLight => new AmbientLight(0xffffff, 0);
