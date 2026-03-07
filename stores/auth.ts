import { defineStore } from 'pinia';

interface User {
  firstName: string;
  lastName: string;
  login: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
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
    async login(credentials: { login: string; password: string }): Promise<LoginResponse> {
      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 700));

      if (credentials.login === 'demo' && credentials.password === 'demo') {
        this.user = {
          firstName: 'Demo',
          lastName: 'User',
          login: 'demo',
        };

        this.loading = false;
        return { success: true };
      }

      this.loading = false;

      return {
        success: false,
        message: 'Неверный логин или пароль',
      };
    },

    logout() {
      this.user = null;
    },
  },
});
