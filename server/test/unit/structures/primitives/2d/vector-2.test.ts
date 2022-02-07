// Local Imports
import { Vector2 } from '../../../../../src/structures/primitives/2d/vector-2';

describe('Vector2', () => {
  describe('constructor', () => {
    it('should create a Vector2 with passed values', async () => {
      const x = 10;
      const y = 20;

      const vector = new Vector2(
        x,
        y,
      );

      expect(vector).toBeInstanceOf(Vector2);
      expect(vector.x).toBe(x);
      expect(vector.y).toBe(y);
    });

    it('should create a Vector2 with default values', async () => {
      const x = 0;
      const y = 0;

      const vector = new Vector2();

      expect(vector).toBeInstanceOf(Vector2);
      expect(vector.x).toBe(x);
      expect(vector.y).toBe(y);
    });
  });
});
