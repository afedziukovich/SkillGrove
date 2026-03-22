import { describe, it, expect } from 'vitest';
import { RandomTaskParametersSchema } from '#shared/schemas';

describe('Zod Task Schemas Unit Tests', () => {
  describe('RandomTaskParametersSchema', () => {
    it('should parse and coerce valid string inputs to numbers', () => {
      const input = { categoryId: '10', difficultyId: '5' };
      const result = RandomTaskParametersSchema.safeParse(input);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.categoryId).toBe(10);
        expect(result.data.difficultyId).toBe(5);
      }
    });

    it('should fail if numbers are not positive', () => {
      const input = { categoryId: 0, difficultyId: -1 };
      const result = RandomTaskParametersSchema.safeParse(input);

      expect(result.success).toBe(false);
    });
  });
});
