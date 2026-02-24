<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <AppInput
        v-model="name"
        type="text"
        placeholder="Имя"
        :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">
        {{ errors.name }}
      </p>
    </div>
    <div>
      <AppInput
        v-model="email"
        type="email"
        placeholder="Email"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <AppInput
        v-model="password"
        type="password"
        placeholder="Пароль"
        :class="{ 'border-red-500': errors.password }"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">
        {{ errors.password }}
      </p>
    </div>
    <AppButton type="submit" :disabled="loading">
      {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
    </AppButton>
    <p v-if="formError" class="text-red-500 text-sm mt-2">
      {{ formError }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../model/authStore'
import AppInput from '@/shared/ui/AppInput.vue'
import AppButton from '@/shared/ui/AppButton.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const formError = ref('')
const errors = ref<{ name?: string; email?: string; password?: string }>({})

const authStore = useAuthStore()
const router = useRouter()

const validate = (): boolean => {
  errors.value = {}
  if (!name.value) {
    errors.value.name = 'Имя обязательно'
  }
  if (!email.value) {
    errors.value.email = 'Email обязателен'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Некорректный email'
  }
  if (!password.value) {
    errors.value.password = 'Пароль обязателен'
  } else if (password.value.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов'
  }
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  formError.value = ''
  try {
    await authStore.register(email.value, password.value, name.value)
    router.push('/dashboard')
  } catch (error: any) {
    formError.value = error.message || 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>
