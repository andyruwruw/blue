import * as express from 'express';

import { GLOBE } from '../config';
import { Rectangle } from '../structures/primitives/rectangle';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Hello World!');
});

router.get('/:resolution/:minLongitude/:minLatitude/:width/:height', async (req, res) => {
  const resolution = parseInt(req.params.resolution, 10);
  const longitude = parseInt(req.params.minLongitude, 10);
  const latitude = parseInt(req.params.minLatitude, 10);
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);

  const boundary = new Rectangle(
    longitude + width / 2,
    latitude + height / 2,
    width,
    height,
  );

  const polygons = GLOBE.getPolygons(
    resolution,
    boundary,
  );

  res.send({
    polygons,
  });
});

export default {
  routes: router,
};
