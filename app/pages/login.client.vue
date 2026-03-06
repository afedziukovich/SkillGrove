<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { UserCredentialsDTO } from '~~/shared/schemas';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive<UserCredentialsDTO>({
  login: '',
  password: '',
});

const error = ref('');

const handleSubmit = async () => {
  const result = await authStore.login(form);
  if (result.success) {
    await router.push('/');
  } else {
    error.value = result.message ?? 'Login failed';
  }
};
</script>

<template>
  <ClientOnly>
    <div class="flex-1 flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Вход в аккаунт</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="login" class="sr-only">Логин</label>
              <input
                id="login"
                v-model="form.login"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Логин"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Пароль</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Пароль"
              />
            </div>
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {{ authStore.loading ? 'Загрузка...' : 'Войти' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </ClientOnly>
</template>
