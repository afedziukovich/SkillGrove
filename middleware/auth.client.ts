import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') {
    return;
  }

  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo('/login');
  }
});
