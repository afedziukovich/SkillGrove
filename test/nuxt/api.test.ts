import { describe, it, expect, vi } from 'vitest';

const fetchCategories = async () => {
  const response = await $fetch('/api/protected/task-categories', {
    credentials: 'include',
  });
  return response;
};

describe('API functions', () => {
  it('fetches categories successfully', async () => {
    const mockCategories = [{ id: 1, name: 'JavaScript' }];
    global.$fetch = vi.fn().mockResolvedValue(mockCategories);

    const result = await fetchCategories();
    expect(result).toEqual(mockCategories);
  });

  it('handles API errors', async () => {
    global.$fetch = vi.fn().mockRejectedValue(new Error('API Error'));

    await expect(fetchCategories()).rejects.toThrow('API Error');
  });
});
