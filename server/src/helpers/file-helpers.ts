// Packages
import { promises } from 'fs';

const { open } = promises;

/**
 * Reads a binary file and returns hexidecimal data.
 *
 * @param {string} filePath Static path to the file.
 * @returns {string} Hexidecimal string of the file.
 */
export const readBinaryFile = async (filePath: string): Promise<string> => {
  const file = await open(filePath, 'r');

  const data = await file.readFile({
    encoding: 'hex',
  });

  await file.close();

  return data;
};
