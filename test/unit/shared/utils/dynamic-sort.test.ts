import { describe, it, expect } from 'vitest';
import { dynamicSort } from '#shared/utils/dynamic-sort';

interface Item {
  id: number;
  name: string;
  isActive: boolean;
  mixed: unknown;
}

describe('dynamicSort', () => {
  const items: Item[] = [
    { id: 10, name: 'Zebra', isActive: false, mixed: 2 },
    { id: 1, name: 'apple', isActive: true, mixed: 'Hi' },
    { id: 5, name: 'Banana', isActive: false, mixed: true },
  ];

  describe('Numbers', () => {
    it('should sort numbers in ascending order (default)', () => {
      const result = items.toSorted(dynamicSort('id'));
      expect(result.map((i) => i.id)).toEqual([1, 5, 10]);
    });

    it('should sort numbers in descending order', () => {
      const result = items.toSorted(dynamicSort('id', 'desc'));
      expect(result.map((i) => i.id)).toEqual([10, 5, 1]);
    });
  });

  describe('Strings (Case-Insensitive)', () => {
    it('should sort strings alphabetically regardless of case', () => {
      const result = items.toSorted(dynamicSort('name', 'asc'));
      expect(result.map((i) => i.name)).toEqual(['apple', 'Banana', 'Zebra']);
    });

    it('should sort strings in reverse alphabetical order', () => {
      const result = items.toSorted(dynamicSort('name', 'desc'));
      expect(result.map((i) => i.name)).toEqual(['Zebra', 'Banana', 'apple']);
    });
  });

  describe('Booleans', () => {
    it('should sort booleans (false before true) in ascending order', () => {
      const result = items.toSorted(dynamicSort('isActive', 'asc'));
      expect(result.map((i) => i.isActive)).toEqual([false, false, true]);
    });

    it('should sort booleans (true before false) in descending order', () => {
      const result = items.toSorted(dynamicSort('isActive', 'desc'));
      expect(result.map((i) => i.isActive)).toEqual([true, false, false]);
    });
  });

  describe('Mixed Types (Fallback Case)', () => {
    it('should hit the fallback string comparison when types do not match (ascending order)', () => {
      const result = items.toSorted(dynamicSort('mixed', 'asc'));
      expect(result.map((i) => i.id)).toEqual([10, 1, 5]);
    });

    it('should hit the fallback string comparison when types do not match (descending order)', () => {
      const result = items.toSorted(dynamicSort('mixed', 'desc'));
      expect(result.map((i) => i.id)).toEqual([5, 1, 10]);
    });
  });
});
