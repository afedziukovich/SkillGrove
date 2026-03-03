import { defineStore } from 'pinia';

interface User {
  id: number;
  login: string;
  level: number;
  experience: number;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(credentials: { login: string; password: string }) {
      this.loading = true;
      try {
        const response = await $fetch<User>('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = response;
        return { success: true };
      } catch (error: unknown) {
        let errorMessage = 'Login failed';
        if (error && typeof error === 'object' && 'data' in error) {
          const data = (error as { data?: { statusMessage?: string } }).data;
          errorMessage = data?.statusMessage || errorMessage;
        }
        return { success: false, error: errorMessage };
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      this.loading = true;
      try {
        const user = await $fetch<User>('/api/auth/me');
        this.user = user;
      } catch {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' });
      } finally {
        this.user = null;
      }
    },
  },
});
