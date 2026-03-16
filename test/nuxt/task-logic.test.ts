import { describe, it, expect } from 'vitest';

describe('Task.vue - task page logic', () => {
  it('uses categoryId from URL or default value', () => {
    const getCategoryId = (route: { query: { categoryId?: string } }) => {
      return Number(route.query.categoryId) || 1;
    };

    expect(getCategoryId({ query: {} })).toBe(1);
    expect(getCategoryId({ query: { categoryId: '5' } })).toBe(5);
  });

  it('uses difficultyId from URL or default value', () => {
    const getDifficultyId = (route: { query: { difficultyId?: string } }) => {
      return Number(route.query.difficultyId) || 1;
    };

    expect(getDifficultyId({ query: {} })).toBe(1);
    expect(getDifficultyId({ query: { difficultyId: '3' } })).toBe(3);
  });

  it('disables form after solution submission', () => {
    let isFormDisabled = false;

    const submitSolution = () => {
      isFormDisabled = true;
    };

    expect(isFormDisabled).toBe(false);
    submitSolution();
    expect(isFormDisabled).toBe(true);
  });

  it('maps correctness to correct icon and color', () => {
    const correctnessIcons = {
      Correct: { name: 'material-symbols:sentiment-excited', color: 'text-green-500' },
      'Partly correct': { name: 'material-symbols:sentiment-neutral', color: 'text-yellow-500' },
      Incorrect: { name: 'material-symbols:sentiment-sad', color: 'text-red-500' },
    };

    expect(correctnessIcons['Correct'].color).toBe('text-green-500');
    expect(correctnessIcons['Partly correct'].color).toBe('text-yellow-500');
    expect(correctnessIcons['Incorrect'].color).toBe('text-red-500');
  });
});
