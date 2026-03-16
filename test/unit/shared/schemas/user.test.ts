import { describe, it, expect } from 'vitest';
import {
  UserCredentialsSchema,
  UserPaginationQuerySchema,
  UpdatePasswordSchema,
} from '#shared/schemas';

describe('Auth & User Schemas', () => {
  describe('UserCredentialsSchema', () => {
    it('should trim login and accept valid password', () => {
      const input = { login: '  user123  ', password: 'password123' };
      const result = UserCredentialsSchema.parse(input);

      expect(result.login).toBe('user123');
      expect(result.password).toBe('password123');
    });

    it('should fail if password is too short', () => {
      const input = { login: 'user123', password: '123' };
      const result = UserCredentialsSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('UserPaginationQuerySchema', () => {
    it('should provide default values for empty objects', () => {
      const result = UserPaginationQuerySchema.parse({});

      expect(result).toEqual({
        limit: 20,
        page: 1,
        sortBy: 'id',
        order: 'asc',
      });
    });

    it('should coerce strings to numbers for limit and page', () => {
      const input = { limit: '50', page: '2' };
      const result = UserPaginationQuerySchema.parse(input);

      expect(result.limit).toBe(50);
      expect(result.page).toBe(2);
    });

    it('should fail for invalid enum values in sortBy', () => {
      const input = { sortBy: 'invalid_field' };
      const result = UserPaginationQuerySchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('UpdatePasswordSchema', () => {
    it('should fail if newPassword exceeds 100 characters', () => {
      const input = { newPassword: 'a'.repeat(101) };
      const result = UpdatePasswordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
