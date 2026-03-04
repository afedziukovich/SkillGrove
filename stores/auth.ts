import { defineStore } from 'pinia';
import { $fetch, FetchError } from 'ofetch';
import type { UserDTO, ResultDTO } from '../shared/dtos';
import type { UserCredentialsDTO } from '../shared/schemas';
import { toResultDTO } from '../server/utils/converters/common.converter';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserDTO,
  }),
  actions: {
    async register(credentials: UserCredentialsDTO): Promise<ResultDTO> {
      try {
        const user = await $fetch<UserDTO>('/api/public/auth/register', {
          method: 'POST',
          body: credentials,
        });
        this.user = user;

        return toResultDTO(true);
      } catch (error: unknown) {
        const message =
          error instanceof FetchError ? (error.statusMessage ?? error.message) : 'Register failed';
        return toResultDTO(false, message);
      }
    },
    async login(credentials: UserCredentialsDTO): Promise<ResultDTO> {
      try {
        const user = await $fetch<UserDTO>('/api/public/auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = user;

        return toResultDTO(true);
      } catch (error: unknown) {
        const message =
          error instanceof FetchError ? (error.statusMessage ?? error.message) : 'Login failed';
        return toResultDTO(false, message);
      }
    },
    async fetchUser(): Promise<void> {
      try {
        const user = await $fetch<UserDTO>('/api/protected/auth/me');
        this.user = user;
      } catch {
        this.logout();
      }
    },
    logout(): Promise<ResultDTO> {
      this.user = null;
      return $fetch<ResultDTO>('/api/protected/auth/logout', { method: 'POST' });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
