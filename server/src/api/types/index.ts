// Packages
import * as express from 'express';

/**
 * Set of endpoints for API.
 */
export interface Handler {
  routes: express.Router;
  path: string;
}
