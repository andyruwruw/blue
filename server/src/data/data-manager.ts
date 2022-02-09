// Local Imports
import {
  Monitor,
  MonitorLayer,
} from '../helpers/monitor';
import { Globe } from './globe/globe';

/**
 * Manages the various data sources.
 */
export class DataManager {
  /**
   * Static reference to Globe data structure.
   */
  static globe: Globe;

  /**
   * Starts the process of data processing.
   */
  static initialize() {
    Monitor.log(
      this,
      'Beginning data collection.',
      MonitorLayer.NOTIFICATION,
    );

    DataManager.generateInstances();
    DataManager.loadData();
  }

  /**
   * Generates static data structure instances.
   */
  static generateInstances() {
    DataManager.globe = new Globe();
  }

  /**
   * Loads and processes data.
   */
  static loadData() {
    DataManager.globe.loadData();
  }
}