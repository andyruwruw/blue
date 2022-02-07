// Packages
import * as express from 'express';

// Local Imports
import { GLOBE_API_PATH } from '../config';
import { Handler } from '../types';

/**
 * Express router instance for Globe endpoints.
 */
const router = express.Router();

/**
 * Retrieves a list of all the rectangles in the globe.
 */
router.get('/:resolution/:minLongitude/:minLatitude/:width/:height', async (req, res) => {
  // const resolution = parseInt(req.params.resolution, 10);
  // const longitude = parseInt(req.params.minLongitude, 10);
  // const latitude = parseInt(req.params.minLatitude, 10);
  // const width = parseInt(req.params.width, 10);
  // const height = parseInt(req.params.height, 10);

  // const boundary = new Rectangle(
  //   longitude + width / 2,
  //   latitude + height / 2,
  //   width,
  //   height,
  // );

  // const polygons = GLOBE.getPolygons(
  //   resolution,
  //   boundary,
  // );

  res.send({
    polygons: null,
  });
});

export default {
  routes: router,
  path: GLOBE_API_PATH,
} as Handler;
