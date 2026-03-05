import { defineStore } from 'pinia';
import { $fetch } from 'ofetch';
import type { UserDTO, ResultDTO } from '../shared/dtos';
import type { UserCredentialsDTO } from '../shared/schemas';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserDTO,
  }),
  actions: {
    async register(credentials: UserCredentialsDTO): Promise<boolean> {
      try {
        const user = await $fetch<UserDTO>('/api/public/auth/register', {
          method: 'POST',
          body: credentials,
        });
        this.user = user;

        return true;
      } catch {
        return false;
      }
    },
    async login(credentials: UserCredentialsDTO): Promise<boolean> {
      try {
        const user = await $fetch<UserDTO>('/api/public/auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = user;

        return true;
      } catch {
        return false;
      }
    },
    async fetchUser(): Promise<void> {
      try {
        const user = await $fetch<UserDTO>('/api/protected/auth/me');
        this.user = user;
      } catch {
        this.user = null;
      }
    },
    async logout(): Promise<boolean> {
      try {
        this.user = null;
        $fetch<ResultDTO>('/api/protected/auth/logout', { method: 'POST' });
        return true;
      } catch {
        return false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
