<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-10 border border-gray-200 rounded-lg">
      <h1 class="text-2xl font-semibold text-center mb-6">Sign in</h1>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-900"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-900"
        />

        <button
          type="submit"
          class="w-full py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          Sign in
        </button>
      </form>

      <div class="mt-4 text-center text-sm">
        <router-link to="/register" class="font-medium text-gray-900 hover:underline">
          Create account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/model/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (result?.success) {
    router.push('/dashboard')
  }
}
</script>
