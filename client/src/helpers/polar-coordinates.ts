import { Vector3 } from 'three';

export const longitudeAndLatitudeToCoordinates = (
  longitude: number,
  latitude: number,
  radius: number,
): Vector3 => {
  const x = radius * Math.cos(latitude) * Math.cos(longitude);
  const y = radius * Math.cos(latitude) * Math.sin(longitude);
  const z = radius * Math.sin(latitude);

  return new Vector3(
    x,
    y,
    z,
  );
};

export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

export const rotateAroundXAxis = (
  coordinates: Vector3,
  theta: number,
) => new Vector3(
  coordinates.x,
  coordinates.y * Math.cos(theta) + coordinates.z * Math.sin(theta),
  coordinates.z * Math.cos(theta) - coordinates.y * Math.sin(theta),
);
