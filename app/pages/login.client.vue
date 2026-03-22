<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const toast = useToast();

const login = ref('');
const password = ref('');
const errorMessage = ref('');

const auth = useAuthStore();
const router = useRouter();

const formValid = computed(() => {
  return login.value.trim().length > 0 && password.value.length > 0;
});

const submit = async () => {
  errorMessage.value = '';

  if (!formValid.value) {
    errorMessage.value = 'Заполните логин и пароль';
    return;
  }

  const result = await auth.login({
    login: login.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/');
    toast.success({
      title: 'Login Success',
      message: 'You have successfully logged in.',
    });
  } else {
    errorMessage.value = result.message ?? 'An unexpected error occurred. Please try again later.';
    toast.error({
      title: 'Login Failure',
      message: errorMessage.value,
    });
  }
};

const socialLogin = (provider: string) => {
  console.log(provider + ' login will connect to backend API');
};
</script>

<template>
  <div class="h-screen flex items-start justify-center px-4 pt-[72px]">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-sm p-8">
      <h1 class="text-xl font-medium text-center mb-6 text-gray-900">
        Выполните вход, чтобы продолжить свой путь к знаниям
      </h1>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <input
            v-model="login"
            type="text"
            placeholder="Логин"
            class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
          />
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
          />
        </div>

        <div v-if="errorMessage" class="text-sm text-center text-red-600 py-2">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="auth.loading" class="btn btn-primary w-full !py-3">
          {{ auth.loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>

      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="px-3 text-sm text-gray-500">Другие варианты входа</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <div class="flex justify-center gap-3">
        <button
          class="w-12 h-12 border border-gray-200 rounded-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Войти через Google"
          @click="socialLogin('Google')"
        >
          <Icon name="devicon:google" class="w-5 h-5 text-gray-600" />
        </button>

        <button
          class="w-12 h-12 border border-gray-200 rounded-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Войти через GitHub"
          @click="socialLogin('GitHub')"
        >
          <Icon name="devicon:github" class="w-5 h-5 text-gray-600" />
        </button>

        <button
          class="w-12 h-12 border border-gray-200 rounded-sm hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Войти через LinkedIn"
          @click="socialLogin('LinkedIn')"
        >
          <Icon name="devicon:linkedin" class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        Не зарегистрированы?
        <NuxtLink to="/register" class="text-[#08c] hover:text-[#0077aa] transition-colors">
          Регистрация
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  overflow: hidden;
  height: 100%;
}
</style>
