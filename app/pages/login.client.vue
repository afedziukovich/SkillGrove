<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const loading = ref(false);
const touched = ref(false);

const auth = useAuthStore();
const router = useRouter();

const emailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});

const submit = async () => {
  touched.value = true;

  if (!emailValid.value) return;

  loading.value = true;

  const result = await auth.login({
    login: email.value,
    password: 'demo',
  });

  loading.value = false;

  if (result.success) {
    router.push('/');
  } else {
    alert(result.message);
  }
};

const socialLogin = (provider) => {
  alert(provider + ' login will connect to backend API');
};
</script>

<template>
  <div class="flex justify-center py-20 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <!-- title -->
      <h1 class="text-2xl font-bold text-center mb-6">
        Выполните вход, чтобы продолжить свой путь к знаниям
      </h1>

      <!-- form -->
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Адрес электронной почты"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c] transition"
            @blur="touched = true"
          />

          <p v-if="touched && !emailValid" class="text-red-500 text-sm mt-1">
            Введите правильный адрес электронной почты
          </p>
        </div>

        <!-- button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center gap-2 bg-[#08c] hover:bg-[#0077aa] text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
        >
          <svg v-if="loading" class="animate-spin" width="18" height="18" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
            />
          </svg>

          <span>
            {{ loading ? 'Sending...' : 'Продолжить' }}
          </span>
        </button>
      </form>

      <!-- divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-300"></div>

        <span class="px-3 text-sm text-gray-500"> Другие варианты входа </span>

        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <!-- social login -->
      <div class="flex justify-center gap-4">
        <!-- Google -->
        <button
          class="w-12 h-12 flex items-center justify-center border rounded-md hover:bg-gray-100 transition"
          @click="socialLogin('Google')"
        >
          <svg width="22" height="22" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.4 0 6.4 1.2 8.7 3.2l6.5-6.5C35.3 2.6 30 0 24 0 14.7 0 6.6 5.4 2.6 13.2l7.7 6C12 13.1 17.5 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.5c0-1.6-.1-2.7-.4-3.9H24v7.3h12.7c-.3 1.8-1.7 4.4-4.8 6.2l7.4 5.8C43.9 35.5 46.1 30.6 46.1 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M9.9 28.5c-.6-1.8-.9-3.7-.9-5.5s.3-3.7.9-5.5l-7.7-6C.8 15.1 0 19.4 0 24s.8 8.9 2.2 12.5l7.7-6z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 12-2.1 16-5.7l-7.4-5.8c-2 1.4-4.6 2.4-8.6 2.4-6.5 0-12-3.6-14-8.7l-7.7 6C6.6 42.6 14.7 48 24 48z"
            />
          </svg>
        </button>

        <!-- GitHub -->
        <button
          class="w-12 h-12 flex items-center justify-center border rounded-md hover:bg-gray-100 transition"
          @click="socialLogin('GitHub')"
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              fill="currentColor"
              d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.7 10.7.6.1.8-.3.8-.6v-2.2c-3.1.7-3.7-1.3-3.7-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9-.8 2.5-1.1.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.2-5.2-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .9.9-.2 1.8-.3 2.8-.3s1.9.1 2.8.3c2.1-1.2 3-.9 3-.9.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.1-5.2 5.4.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.2 5.4 18.3.5 12 .5z"
            />
          </svg>
        </button>

        <!-- LinkedIn -->
        <button
          class="w-12 h-12 flex items-center justify-center border rounded-md hover:bg-gray-100 transition"
          @click="socialLogin('LinkedIn')"
        >
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path
              fill="#0A66C2"
              d="M20.5 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2 1.4-2 2.9v5.7H9.5V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3v6.4zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.5H3.5V9h3.6v11.5z"
            />
          </svg>
        </button>
      </div>

      <!-- register -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Не зарегистрированы?
        <NuxtLink to="/register" class="text-[#08c] hover:underline"> Регистрация </NuxtLink>
      </p>
    </div>
  </div>
</template>
