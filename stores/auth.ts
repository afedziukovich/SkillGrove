import { defineStore } from 'pinia';
import type { UserCredentialsDTO, UserDTO } from '~~/shared/dtos/user.dto';
import type { ResultDTO } from '~~/shared/dtos/common.dto';
import { FetchError } from 'ofetch';
import { toResultDTO } from '~~/server/utils/converters/common.converter';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserDTO,
  }),
  actions: {
    async login(credentials: UserCredentialsDTO): Promise<ResultDTO> {
      try {
        const user = await $fetch<UserDTO>('/api/auth/login', {
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
        const user = await $fetch<UserDTO>('/api/auth/me');
        this.user = user;
      } catch {
        this.logout();
      }
    },
    logout(): Promise<ResultDTO> {
      this.user = null;
      return $fetch<ResultDTO>('/api/auth/logout', { method: 'POST' });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
