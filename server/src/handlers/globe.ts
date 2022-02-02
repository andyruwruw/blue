import * as express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Hello World!');
});

router.get('/:resolution/:longitude/:latitude', async (req, res) => {
  res.send(req.body);
});

export default {
  routes: router,
};
