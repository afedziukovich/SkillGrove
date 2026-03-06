import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthStore();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return navigateTo('/login');
  }

  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/');
  }
});
