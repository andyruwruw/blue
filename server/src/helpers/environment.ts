// Packages
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Proxy for environment variables.
 */
export class Environment {
  /**
   * Retrieves API port.
   *
   * @returns {number} API port.
   */
  static getPort(): number {
    return parseInt(process.env.PORT, 10) || 3000;
  }
}
