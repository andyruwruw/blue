// Local Imports
import { Environment } from '../../helpers/environment';

/**
 * Port for API to be served from.
 */
export const PORT = Environment.getPort();

/**
 * Console message when API is listening and ready.
 */
export const MESSAGE_LISTENING_SUCCESS = `Listening on port ${PORT}`;

/**
 * Path to API endpoints.
 */
export const BASE_API_PATH = '/api';

/**
 * Path to Globe endpoints.
 */
export const GLOBE_API_PATH = '/globe';
