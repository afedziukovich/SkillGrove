<template>
  <div class="flex flex-col gap-2">
    <div>Login page</div>
    <button class="btn-login" @click="handleLogin">Login</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const success = await authStore.login({
    login: 'admin',
    password: '12345',
  });
  if (success) {
    await router.push('/');
    alert('Login successful!');
  } else {
    alert('Login failed');
  }
};
</script>

<style scoped>
.btn-login {
  @apply border-2 border-blue-500 hover:border-blue-700 disabled:border-gray-500 text-black disabled:text-gray-600 font-bold py-2 px-4 rounded;
}
</style>
