<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const touched = ref(false);

const auth = useAuthStore();
const router = useRouter();

const emailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});

const formValid = computed(() => {
  return emailValid.value && password.value.length > 0;
});

const submit = async () => {
  touched.value = true;

  if (!formValid.value) return;

  const result = await auth.login({
    login: email.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/');
  } else {
    alert(result.message);
  }
};

const socialLogin = (provider: string) => {
  alert(provider + ' login will connect to backend API');
};
</script>

<template>
  <div class="flex justify-center py-20 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">
        Выполните вход, чтобы продолжить свой путь к знаниям
      </h1>

      <form class="space-y-4" @submit.prevent="submit">
        <!-- email -->
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Адрес электронной почты"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c]"
            @blur="touched = true"
          />

          <p v-if="touched && !emailValid" class="text-red-500 text-sm mt-1">
            Введите правильный адрес электронной почты
          </p>
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
          class="w-12 h-12 border rounded-md hover:bg-gray-100"
          @click="socialLogin('Google')"
        >
          G
        </button>

        <button
          class="w-12 h-12 border rounded-md hover:bg-gray-100"
          @click="socialLogin('GitHub')"
        >
          GH
        </button>

        <button
          class="w-12 h-12 border rounded-md hover:bg-gray-100"
          @click="socialLogin('LinkedIn')"
        >
          IN
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        Не зарегистрированы?
        <NuxtLink to="/register" class="text-[#08c] hover:underline"> Регистрация </NuxtLink>
      </p>
    </div>
  </div>
</template>
