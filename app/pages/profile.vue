<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { LoginUserDTO, UpdatePasswordDTO } from '~~/shared/schemas/user';

definePageMeta({
  requiresAuth: true,
});

const auth = useAuthStore();
const toast = useToast();

const user = ref<LoginUserDTO>({
  login: '',
});

const passwordData = ref<UpdatePasswordDTO & { confirmPassword: string }>({
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

  await auth.fetchUser();

  if (auth.user) {
    user.value = auth.user;
  } else {
    error.value = 'Failed to load profile';
    toast.error({
      title: 'User fetching failure',
      message: error.value,
    });
  }

  loading.value = false;
};

const changePassword = async () => {
  if (passwordData.value.newPassword.length < 6) {
    passwordError.value = 'The new password must be at least 6 characters long.';
    return;
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    passwordError.value = "The passwords don't match";
    return;
  }

  passwordLoading.value = true;
  passwordError.value = null;
  passwordSuccess.value = null;

  const result = await auth.updatePassword({ newPassword: passwordData.value.newPassword });

  if (result.success) {
    passwordSuccess.value = 'Password changed successfully';
    passwordData.value = {
      newPassword: '',
      confirmPassword: '',
    };
    toast.success({
      title: 'Password change success',
      message: 'Password has successfully changed.',
    });
  } else {
    passwordError.value = result.message ?? 'Error changing password';
    toast.error({
      title: 'Password change failure',
      message: passwordError.value,
    });
  }

  passwordLoading.value = false;
};

const clearMessages = () => {
  passwordError.value = null;
  passwordSuccess.value = null;
};

onMounted(fetchUserProfile);
</script>

<template>
  <div class="flex-1">
    <div class="container-custom py-16">
      <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-medium text-gray-900 mb-8 text-center">User profile</h1>

        <div v-if="loading" class="text-center py-10">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08c]"
          ></div>
          <p class="mt-2 text-sm text-gray-500">Loading profile...</p>
        </div>

        <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6">
          {{ error }}
        </div>

        <div v-else class="bg-white border border-gray-200 rounded-sm p-8">
          <div class="mb-8">
            <label class="text-sm text-gray-500 block mb-2">Login</label>
            <input
              :value="user.login"
              class="w-full px-4 py-3 text-[15px] bg-gray-50 border border-gray-200 rounded-sm text-gray-600 cursor-not-allowed"
              disabled
              readonly
            />
          </div>

          <div class="space-y-4">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Change password</h2>

            <div v-if="passwordError" class="bg-red-50 text-red-600 p-3 rounded-sm text-sm">
              {{ passwordError }}
            </div>
            <div v-if="passwordSuccess" class="bg-green-50 text-green-600 p-3 rounded-sm text-sm">
              {{ passwordSuccess }}
            </div>

            <div>
              <label class="text-sm text-gray-500 block mb-2">
                New password <span class="text-red-500">*</span>
              </label>
              <input
                v-model="passwordData.newPassword"
                type="password"
                placeholder="Minimum 6 characters"
                class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
                :disabled="passwordLoading"
                @input="clearMessages"
              />
            </div>

            <div>
              <label class="text-sm text-gray-500 block mb-2">
                Repeat new password <span class="text-red-500">*</span>
              </label>
              <input
                v-model="passwordData.confirmPassword"
                type="password"
                placeholder="Repeat the new password"
                class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
                :disabled="passwordLoading"
                @input="clearMessages"
              />
            </div>

            <button
              :disabled="
                passwordLoading || !passwordData.newPassword || !passwordData.confirmPassword
              "
              class="btn btn-primary w-full !py-3 mt-4"
              @click="changePassword"
            >
              <span v-if="passwordLoading" class="flex items-center justify-center">
                <span
                  class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                ></span>
                Changing password...
              </span>
              <span v-else>Change password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
