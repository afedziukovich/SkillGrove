import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '../../stores';

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') {
    return;
  }

  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo('/login');
  }
});
