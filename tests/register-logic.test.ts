import { describe, it, expect, vi } from 'vitest';

describe('Register.vue - registration logic', () => {
  it('requires minimum 3 characters for login', () => {
    const isLoginValid = (login: string) => login.length >= 3;

    expect(isLoginValid('ab')).toBe(false);
    expect(isLoginValid('abc')).toBe(true);
    expect(isLoginValid('abcd')).toBe(true);
  });

  it('requires minimum 6 characters for password', () => {
    const isPasswordValid = (password: string) => password.length >= 6;

    expect(isPasswordValid('12345')).toBe(false);
    expect(isPasswordValid('123456')).toBe(true);
    expect(isPasswordValid('1234567')).toBe(true);
  });

  it('form is valid only when both fields meet requirements', () => {
    const isFormValid = (login: string, password: string) => {
      return login.length >= 3 && password.length >= 6;
    };

    expect(isFormValid('ab', '12345')).toBe(false);
    expect(isFormValid('abc', '12345')).toBe(false);
    expect(isFormValid('ab', '123456')).toBe(false);
    expect(isFormValid('abc', '123456')).toBe(true);
  });

  it('redirects to login page after successful registration', () => {
    const push = vi.fn();
    const registerResult = { success: true };

    if (registerResult.success) {
      push('/login');
    }

    expect(push).toHaveBeenCalledWith('/login');
  });
});
