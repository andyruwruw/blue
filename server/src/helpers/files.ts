import fs from 'fs';

export const readFile = async (filePath: string): Promise<string> => {
  const data = await fs.readFileSync(filePath, 'binary');

  return data;
};
