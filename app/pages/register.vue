<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const login = ref('');
const password = ref('');
const error = ref('');
const touched = ref(false);

const auth = useAuthStore();
const router = useRouter();

const loginValid = computed(() => login.value.length >= 3);
const passwordValid = computed(() => password.value.length >= 6);

const formValid = computed(() => loginValid.value && passwordValid.value);

const submit = async () => {
  touched.value = true;
  error.value = '';

  if (!formValid.value) return;

  const result = await auth.register({
    login: login.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/login');
  } else {
    error.value = result.message ?? 'Registration failed';
  }
};
</script>

<template>
  <div class="flex justify-center py-20 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Создайте аккаунт</h1>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <input
            v-model="login"
            type="text"
            placeholder="Login"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c]"
            @blur="touched = true"
          />

          <p v-if="touched && !loginValid" class="text-red-500 text-sm mt-1">
            Логин должен содержать минимум 3 символа
          </p>
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#08c]"
          />

          <p v-if="touched && !passwordValid" class="text-red-500 text-sm mt-1">
            Пароль должен содержать минимум 6 символов
          </p>
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full bg-[#08c] hover:bg-[#0077aa] text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
        >
          {{ auth.loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <p v-if="error" class="text-red-500 text-center mt-4">
        {{ error }}
      </p>

      <p class="text-center text-sm text-gray-500 mt-6">
        Уже есть аккаунт?
        <NuxtLink to="/login" class="text-[#08c] hover:underline"> Войти </NuxtLink>
      </p>
    </div>
  </div>
</template>
