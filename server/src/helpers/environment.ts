// Packages
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Proxy for environment variables.
 */
export class Environment {
  /**
   * Whether to console.log Debug layer messages.
   *
   * @returns {boolean} Whether to console.log Debug layer messages.
   */
  static displayDebug(): boolean {
    return parseInt(process.env.DEBUG, 0) > 0;
  }

  /**
   * Whether to console.log Notification layer messages.
   *
   * @returns {boolean} Whether to console.log Notification layer messages.
   */
  static displayNotification(): boolean {
    return parseInt(process.env.NOTIFCATION, 0) > 0;
  }

  /**
   * Whether to console.log Warning layer messages.
   *
   * @returns {boolean} Whether to console.log Warning layer messages.
   */
  static displayWarning(): boolean {
    return parseInt(process.env.WARNING, 0) > 0;
  }

  /**
   * Whether to console.log Update layer messages.
   *
   * @returns {boolean} Whether to console.log Update layer messages.
   */
  static displayUpdate(): boolean {
    return parseInt(process.env.UPDATE, 0) > 0;
  }

  /**
   * Retrieves API port.
   *
   * @returns {number} API port.
   */
  static getPort(): number {
    return parseInt(process.env.PORT, 10) || 3000;
  }
}
