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
      const vector = new Vector2();

      expect(vector).toBeInstanceOf(Vector2);
      expect(vector.x).toBe(0);
      expect(vector.y).toBe(0);
    });
  });

  describe('add', () => {
    it('should add two Vector2 with correct sum', async () => {
      const x1 = 2;
      const y1 = 5;
      const x2 = 12;
      const y2 = 10;

      const vector1 = new Vector2(
        x1,
        y1,
      );
      const vector2 = new Vector2(
        x2,
        y2,
      );

      const sum = vector1.add(vector2);

      expect(sum).toBeInstanceOf(Vector2);
      expect(sum.x).toBe(x1 + x2);
      expect(sum.y).toBe(y1 + y2);
    });
  });

  describe('subtract', () => {
    it('should subtract two Vector2 with correct difference', async () => {
      const x1 = 10;
      const y1 = 10;
      const x2 = 2;
      const y2 = 5;

      const vector1 = new Vector2(
        x1,
        y1,
      );
      const vector2 = new Vector2(
        x2,
        y2,
      );

      const difference = vector1.subtract(vector2);

      expect(difference).toBeInstanceOf(Vector2);
      expect(difference.x).toBe(x1 - x2);
      expect(difference.y).toBe(y1 - y2);
    });
  });

  describe('getMagnitude', () => {
    it('should return the correct magnitude of Vector2', async () => {
      const x1 = 3;
      const y1 = 4;

      const vector = new Vector2(
        x1,
        y1,
      );

      const magnitude = vector.getMagnitude();

      expect(magnitude).toBe(5);
    });
  });
});
