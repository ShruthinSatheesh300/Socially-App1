import express from 'express';
const router = express.Router();

import userRoutes from './user.route';
import postRoutes from './post.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routeMaps = [
  {
    path: '/users',
    handler: userRoutes
  },
  {
    path: '/posts',
    handler: postRoutes
  }
];
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome To Socially');
  });
  routeMaps.forEach(({ path, handler }) => {
    router.use(path, handler);
  });

  return router;
};

export default routes;
