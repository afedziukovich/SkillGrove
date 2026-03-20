import { defineStore } from 'pinia';
import { $fetch, FetchError } from 'ofetch';
import type { UserDTO, ResultDTO } from '#shared/dtos';
import type { UpdatePasswordDTO, UserCredentialsDTO } from '#shared/schemas';
import { toResultDTO } from '#shared/converters';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | UserDTO,
    loading: false,
  }),
  actions: {
    async register(credentials: UserCredentialsDTO): Promise<ResultDTO> {
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },
    async login(credentials: UserCredentialsDTO): Promise<ResultDTO> {
      this.loading = true;
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
      } finally {
        this.loading = false;
      }
    },
    async fetchUser(): Promise<void> {
      this.loading = true;
      try {
        const user = await $fetch<UserDTO>('/api/protected/auth/me');
        this.user = user;
      } catch {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
    async logout(): Promise<ResultDTO> {
      this.loading = true;
      try {
        this.user = null;
        return $fetch<ResultDTO>('/api/protected/auth/logout', { method: 'POST' });
      } catch (error: unknown) {
        const message =
          error instanceof FetchError ? (error.statusMessage ?? error.message) : 'Logout failed';
        return toResultDTO(false, message);
      } finally {
        this.loading = false;
      }
    },
    async updatePassword(passwordData: UpdatePasswordDTO): Promise<ResultDTO> {
      try {
        return $fetch<ResultDTO>('/api/protected/auth/update-password', {
          method: 'POST',
          body: passwordData,
        });
      } catch (error: unknown) {
        const message =
          error instanceof FetchError
            ? (error.statusMessage ?? error.message)
            : 'Password update failed';
        return toResultDTO(false, message);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
