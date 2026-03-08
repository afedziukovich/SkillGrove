<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

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
  } else {
    errorMessage.value = result.message || '';
  }
};

const socialLogin = (provider: string) => {
  console.log(provider + ' login will connect to backend API');
};
</script>

<template>
  <div class="flex justify-center py-20 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">
        Выполните вход, чтобы продолжить свой путь к знаниям
      </h1>

      <form class="space-y-4" @submit.prevent="submit">
        <!-- login -->
        <div>
          <input
            v-model="login"
            type="text"
            placeholder="Логин"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c]"
          />
        </div>

        <!-- password -->
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Пароль"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c]"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full bg-[#08c] hover:bg-[#0077aa] text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
        >
          {{ auth.loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>

      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="px-3 text-sm text-gray-500">Другие варианты входа</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <div class="flex justify-center gap-4">
        <button
          class="w-12 h-12 border rounded-md hover:bg-gray-100 flex items-center justify-center"
          @click="socialLogin('Google')"
        >
          <Icon name="devicon:google" class="w-5 h-5" />
        </button>

        <button
          class="w-12 h-12 border rounded-md hover:bg-gray-100 flex items-center justify-center"
          @click="socialLogin('GitHub')"
        >
          <Icon name="devicon:github" class="w-5 h-5" />
        </button>

        <button
          class="w-12 h-12 border rounded-md hover:bg-gray-100 flex items-center justify-center"
          @click="socialLogin('LinkedIn')"
        >
          <Icon name="devicon:linkedin" class="w-5 h-5" />
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        Не зарегистрированы?
        <NuxtLink to="/register" class="text-[#08c] hover:underline"> Регистрация </NuxtLink>
      </p>
    </div>
  </div>
</template>
