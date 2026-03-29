<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const toast = useToast();

const login = ref('');
const password = ref('');
const errorMessage = ref('');
const touched = ref(false);

const auth = useAuthStore();
const router = useRouter();

const loginValid = computed(() => login.value.length >= 3);
const passwordValid = computed(() => password.value.length >= 6);

const formValid = computed(() => loginValid.value && passwordValid.value);

const submit = async () => {
  touched.value = true;
  errorMessage.value = '';

  if (!formValid.value) return;

  const result = await auth.register({
    login: login.value,
    password: password.value,
  });

  if (result.success) {
    router.push('/');
    toast.success({
      title: 'Registration success',
      message: 'Your account has been created and you are now logged in.',
    });
  } else {
    errorMessage.value = result.message ?? 'An unexpected error occurred. Please try again later.';
    toast.error({
      title: 'Registration failure',
      message: errorMessage.value,
    });
  }
};
</script>

<template>
  <div class="h-screen flex items-start justify-center px-4 pt-[72px]">
    <div class="w-full max-w-md bg-white border border-gray-200 rounded-sm p-8">
      <h1 class="text-xl font-medium text-center mb-6 text-gray-900">Create an account</h1>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <input
            v-model="login"
            type="text"
            placeholder="Login"
            class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
            @blur="touched = true"
          />
          <p v-if="touched && !loginValid" class="text-red-500 text-sm mt-1">
            Login must contain at least 3 characters
          </p>
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
          />
          <p v-if="touched && !passwordValid" class="text-red-500 text-sm mt-1">
            The password must contain at least 6 characters
          </p>
        </div>

        <div v-if="errorMessage" class="text-sm text-center text-red-600 py-2">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="auth.loading" class="btn btn-primary w-full !py-3">
          {{ auth.loading ? 'Signing up...' : 'Sign up' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-[#08c] hover:text-[#0077aa] transition-colors">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
