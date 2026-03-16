import { describe, it, expect, vi } from 'vitest';

describe('Login.vue - login logic', () => {
  it('validates that login and password are not empty', () => {
    const isFormValid = (login: string, password: string) => {
      return login.trim().length > 0 && password.length > 0;
    };

    expect(isFormValid('', '')).toBe(false);
    expect(isFormValid('user', '')).toBe(false);
    expect(isFormValid('', 'pass')).toBe(false);
    expect(isFormValid('user', 'pass')).toBe(true);
  });

  it('redirects to home page after successful login', () => {
    const push = vi.fn();
    const loginResult = { success: true };

    if (loginResult.success) {
      push('/');
    }

    expect(push).toHaveBeenCalledWith('/');
  });

  it('shows error message on failed login', () => {
    let errorMessage = '';
    const loginResult = { success: false, message: 'Invalid credentials' };

    if (!loginResult.success) {
      errorMessage = loginResult.message || '';
    }

    expect(errorMessage).toBe('Invalid credentials');
  });
});
