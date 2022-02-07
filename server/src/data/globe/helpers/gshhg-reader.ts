// Packages
import { Parser } from 'binary-parser';
import * as path from 'path';

// Local Imports
import {
  GSHHG_DIRECTORY_NAME,
  GSHHG_FILE_POSTFIX,
  GSHHG_FILE_PREFIX,
  GSHHG_HALF_BYTE_SIZE,
  GSSHG_POINT_HALF_BYTE_SIZE,
  GSSHG_POSITION_SCALE,
  GSHHG_RESOLUTION_NAMES,
} from '../config';
import { readBinaryFile } from '../../../helpers/file-helpers';

// Types
import {
  GSHHG,
  GSHHGPoint,
} from '../types';

/**
 * Helper class to read GSHHG binary files.
 */
class GSHHGReader {
  /**
   * Whether the data in the GSHHGReader is ready to be read.
   */
  _ready: boolean;

  /**
   * Desired level of detail from 0 to 4.
   */
  _resolution: number;

  /**
   * Current GSHHG binary data in hexidecimals.
   */
  _data: string;

  /**
   * Current position of cursor.
   */
  _position: number;

  /**
   * Size of the GSHHG binary data.
   */
  _size: number;

  /**
   * Hexidecimal parser for GSHHG header.
   */
  _gshhgParser: Parser;

  /**
   * Hexidecimal parser for GSHHG points.
   */
  _gshhgPointParser: Parser;

  /**
   * Current GSHHG object being read.
   */
  _currentGSSHG: GSHHG | null;

  /**
   * Instantiates a GSHHGReader object.
   *
   * @param {number} resolution Desired level of detail from 0 to 4.
   */
  constructor(resolution: number) {
    this._ready = false;
    this._resolution = resolution;
    this._position = 0;
    this._size = 0;
    this._data = '';

    this._gshhgParser = new Parser()
      .int32be('id')
      .int32be('n')
      .int8('level')
      .int8('version')
      .int8('greenwich')
      .int8('source')
      .int32be('west')
      .int32be('east')
      .int32be('south')
      .int32be('north')
      .int32be('area')
      .int32be('areaFull')
      .int32be('container')
      .int32be('ancestor');
    this._gshhgPointParser = new Parser()
      .int32be('x')
      .int32be('y');
  }

  /**
   * Loads the binary GSHHG file into the GSHHGReader.
   */
  async loadFile(): Promise<void> {
    this._data = await readBinaryFile(this._getFilePath());
    this._size = this._data.length;
    this._ready = true;
  }

  /**
   * Retrieves next GSHHG header.
   *
   * @returns {GSHHG | null} GSHHG header, or null if not available.
   */
  getNextGSHHS(): GSHHG | null {
    if (!this._ready
      || this._position >= this._size
      || this.getNumberPointsUnread() > 0) {
      return null;
    }

    const rawGSSHG = this._gshhgParser.parse(
      Buffer.from(
        this._data.substring(
          this._position,
          this._position + GSHHG_HALF_BYTE_SIZE,
        ),
        'hex',
      ),
    );
    rawGSSHG.id = `${rawGSSHG.id}`;
    this._registerGSHHGRead();

    this._currentGSSHG = {
      ...rawGSSHG,
      points: [],
    };
    this._currentGSSHG.north *= GSSHG_POSITION_SCALE;
    this._currentGSSHG.south *= GSSHG_POSITION_SCALE;
    this._currentGSSHG.west *= GSSHG_POSITION_SCALE;
    this._currentGSSHG.east *= GSSHG_POSITION_SCALE;

    return this._currentGSSHG;
  }

  /**
   * Whether the reader has any remaining GSHHG headers to read.
   *
   * @returns {boolean} Whether the reader has any remaining GSHHG headers to read.
   */
  hasNext(): boolean {
    return this._position < this._size;
  }

  /**
   * Retrieves next GSHHG point.
   *
   * @returns {GSHHGPoint | null} GSHHG point, or null if not available.
   */
  getNextGSHHSPoint(): GSHHGPoint | null {
    if (!this._ready
      || this._position >= this._size
      || this._currentGSSHG === null
      || this.getNumberPointsUnread() < 1) {
      return null;
    }

    const rawPoint = this._gshhgPointParser.parse(
      Buffer.from(
        this._data.substring(
          this._position,
          this._position + GSSHG_POINT_HALF_BYTE_SIZE,
        ),
        'hex',
      ),
    );
    this._registerGSHHGPointRead();

    const point = {
      x: rawPoint.x * GSSHG_POSITION_SCALE,
      y: rawPoint.y * GSSHG_POSITION_SCALE,
    };

    this._currentGSSHG.points.push(point);
    return point;
  }

  /**
   * Retrieves current GSHHG header being queried.
   *
   * @returns {GSHHG | null} GSHHG header, or null if not available.
   */
  getCurrentGSHHG(): GSHHG | null {
    return this._currentGSSHG;
  }

  /**
   * Retrieves current GSHHG header being queried's identifier.
   *
   * @returns {string} GSHHG header identifier, or empty string if not available.
   */
  getCurrentGSHHGId(): string {
    if (this._currentGSSHG) {
      return this._currentGSSHG.id;
    }
    return '';
  }

  /**
   * Retrieves number of points yet to read for the current GSHGG header.
   *
   * @returns {number} Number of points yet to read.
   */
  getNumberPointsUnread(): number {
    if (this._currentGSSHG) {
      return this._currentGSSHG.n - this._currentGSSHG.points.length;
    }
    return -1;
  }

  /**
   * Generates the file path to binary GSHHS file.
   *
   * @returns {string} File path.
   */
  _getFilePath(): string {
    const directory = path.join(__dirname, `../../../../src/data/${GSHHG_DIRECTORY_NAME}`);
    const fileName = `${GSHHG_FILE_PREFIX}${GSHHG_RESOLUTION_NAMES[this._resolution]}${GSHHG_FILE_POSTFIX}`;
    
    return `${directory}/${fileName}`;
  }

  /**
   * Marks a GSHHG header read.
   */
  _registerGSHHGRead(): void {
    this._position += GSHHG_HALF_BYTE_SIZE;
  }

  /**
   * Marks a GSHHG point read.
   */
  _registerGSHHGPointRead(): void {
    this._position += GSSHG_POINT_HALF_BYTE_SIZE;
  }
}

export default GSHHGReader;
