<script setup lang="ts">
import { ref, onMounted } from 'vue';

definePageMeta({
  requiresAuth: true,
});

type UserProfile = {
  id: number;
  login: string;
};

type PasswordChangeData = {
  newPassword: string;
  currentPassword: string;
  confirmPassword: string;
};

const user = ref<UserProfile>({
  id: 0,
  login: '',
});

const passwordData = ref<PasswordChangeData>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const loading = ref(true);
const passwordLoading = ref(false);
const error = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const passwordSuccess = ref<string | null>(null);

const fetchUserProfile = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch<UserProfile>('/api/protected/auth/me', {
      credentials: 'include',
    });
    user.value = data;
  } catch {
    error.value = 'Не удалось загрузить профиль';
  } finally {
    loading.value = false;
  }
};

const changePassword = async () => {
  if (!passwordData.value.currentPassword) {
    passwordError.value = 'Введите текущий пароль';
    return;
  }

  if (passwordData.value.newPassword.length < 6) {
    passwordError.value = 'Новый пароль должен быть не менее 6 символов';
    return;
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    passwordError.value = 'Пароли не совпадают';
    return;
  }

  passwordLoading.value = true;
  passwordError.value = null;
  passwordSuccess.value = null;

  try {
    await $fetch('/api/protected/auth/update-password', {
      method: 'POST',
      body: {
        newPassword: passwordData.value.newPassword,
      },
      credentials: 'include',
    });

    passwordSuccess.value = 'Пароль успешно изменен';

    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  } catch {
    passwordError.value = 'Ошибка при смене пароля';
  } finally {
    passwordLoading.value = false;
  }
};

const clearMessages = () => {
  passwordError.value = null;
  passwordSuccess.value = null;
};

onMounted(fetchUserProfile);
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold mb-10">Профиль пользователя</h1>

    <div v-if="loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08c]"></div>
      <p class="mt-2 text-gray-600">Загрузка профиля...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <div v-else class="border rounded-lg p-6 space-y-6">
      <div>
        <label class="text-sm text-gray-600 block mb-1">Логин</label>
        <input
          :value="user.login"
          class="border w-full p-2.5 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
          disabled
          readonly
        />
      </div>

      <div v-if="passwordError" class="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
        {{ passwordError }}
      </div>
      <div v-if="passwordSuccess" class="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
        {{ passwordSuccess }}
      </div>

      <div>
        <label class="text-sm text-gray-600 block mb-1">
          Текущий пароль <span class="text-red-500">*</span>
        </label>
        <input
          v-model="passwordData.currentPassword"
          type="password"
          class="border w-full p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[#08c] focus:border-transparent"
          :disabled="passwordLoading"
          @input="clearMessages"
        />
      </div>

      <div>
        <label class="text-sm text-gray-600 block mb-1">
          Новый пароль <span class="text-red-500">*</span>
        </label>
        <input
          v-model="passwordData.newPassword"
          type="password"
          class="border w-full p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[#08c] focus:border-transparent"
          :disabled="passwordLoading"
          @input="clearMessages"
        />
      </div>

      <div>
        <label class="text-sm text-gray-600 block mb-1">
          Подтвердите новый пароль <span class="text-red-500">*</span>
        </label>
        <input
          v-model="passwordData.confirmPassword"
          type="password"
          class="border w-full p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[#08c] focus:border-transparent"
          :disabled="passwordLoading"
          @input="clearMessages"
        />
      </div>

      <button
        :disabled="
          passwordLoading ||
          !passwordData.currentPassword ||
          !passwordData.newPassword ||
          !passwordData.confirmPassword
        "
        class="w-full bg-[#08c] hover:bg-[#0077aa] text-white px-6 py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        @click="changePassword"
      >
        <span v-if="passwordLoading" class="flex items-center justify-center">
          <span
            class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></span>
          Смена пароля...
        </span>
        <span v-else>Сменить пароль</span>
      </button>
    </div>
  </div>
</template>
