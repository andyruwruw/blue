// Local Imports
import { Circle } from "../structures/primitives/2d/circle";
import { Rectangle } from "../structures/primitives/2d/rectangle";
import { distance2D } from "./coordinates";

/**
 * Determines if a Circle and Rectangle overlap.
 *
 * @param {Circle} circle Circle to be checked.
 * @param {Rectangle} rectangle Rectangle to be checked.
 * @returns {boolean} Whether the Circle and Rectangle overlap.
 */
export const intersectCircleAndRectangle = (
  circle: Circle,
  rectangle: Rectangle,
): boolean => {
  const xDist = Math.abs(rectangle.getAnchor().x - circle.getAnchor().x);
  const yDist = Math.abs(rectangle.getAnchor().y - circle.getAnchor().y);

  const xEdges = Math.pow((xDist - rectangle.getWidth()), 2);
  const yEdges = Math.pow((yDist - rectangle.getHeight()), 2);
  const edges = xEdges + yEdges;

  if (xDist > (circle.getRadius() + rectangle.getWidth())
    || yDist > (circle.getRadius() + rectangle.getHeight())) {
    return false;
  }
      
  if (xDist <= rectangle.getWidth()
    || yDist <= rectangle.getHeight()) {
    return true;
  }

  return edges <= circle.getRSquared();
}

/**
 * Determines if a Circle and Circle overlap.
 *
 * @param {Circle} circle1 First Circle to be checked.
 * @param {Circle} circle2 Second Circle to be checked.
 * @returns {boolean} Whether the Circles overlap.
 */
export const intersectCircles = (
  circle1: Circle,
  circle2: Circle,
): boolean => {
  const distanceBetweenAnchors = distance2D(
    circle1.getAnchor(),
    circle2.getAnchor(),
  );
  const radiusCombined = circle1.getRadius() + circle2.getRadius();

  return distanceBetweenAnchors <= radiusCombined;
}

/**
 * Determines if a Rectangle and Rectangle overlap.
 *
 * @param {Rectangle} rectangle1 First Rectangle to be checked.
 * @param {Rectangle} rectagle2 Second Rectangle to be checked.
 * @returns {boolean} Whether the Rectangles overlap.
 */
export const intersectRectangles = (
  rectangle1: Rectangle,
  rectangle2: Rectangle,
): boolean => {
  return !(rectangle1.getAnchor().x - rectangle1.getWidth() > rectangle2.getAnchor().x + rectangle2.getWidth() ||
    rectangle1.getAnchor().x + rectangle1.getWidth() < rectangle2.getAnchor().x - rectangle2.getWidth() ||
    rectangle1.getAnchor().y - rectangle1.getHeight() > rectangle2.getAnchor().y + rectangle2.getHeight() ||
    rectangle1.getAnchor().y + rectangle1.getHeight() < rectangle2.getAnchor().y - rectangle2.getHeight());
}
