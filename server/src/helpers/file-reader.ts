// Packages
import { promises } from 'fs';

const { open } = promises;

/**
 * Helper class to read files.
 */
class FileReader {
  /**
   * Instantiates a FileReader.
   */
  constructor() {}

  /**
   * Reads a binary file and returns hexidecimal data.
   *
   * @param {string} filePath Static path to the file.
   * @returns {string} Hexidecimal string of the file.
   */
  async readBinaryFile(filePath: string): Promise<string> {
    const file = await open(filePath, 'r');

    const data = await file.readFile({
      encoding: 'hex',
    });

    await file.close();

    return data;
  }
}

export default FileReader;
