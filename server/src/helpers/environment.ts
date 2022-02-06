// Packages
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Proxy for environment variables.
 */
class Environment {
  /**
   * Initializes a environment variable accessor.
   */
  constructor() {
  }

  /**
   * Retrieves API port.
   *
   * @returns {number} API port.
   */
  getPort(): number {
    return parseInt(process.env.PORT, 10) || 3000;
  }
}

export default Environment;
