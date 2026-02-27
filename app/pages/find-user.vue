<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 content-start">
      <label for="login">User Login:</label>
      <input
        id="login"
        v-model="login"
        class="border-2"
        type="text"
        placeholder="Enter user login"
        @keyup.enter="findUser"
      />
      <button class="btn-submit" :disabled="isLoading" @click="findUser">
        {{ isLoading ? 'Searching...' : 'Find User' }}
      </button>
    </div>

    <div v-if="isLoading" class="">Loading...</div>

    <div v-if="user" class="flex flex-col">
      <h2>User Found:</h2>
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Login:</strong> {{ user.login }}</p>
      <p><strong>Experience:</strong> {{ user.experience }}</p>
      <p><strong>Level:</strong> {{ user.level }}</p>
    </div>

    <div v-if="findError" class="text-red-600">
      {{ findError }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';
import type { UserResponseDTO } from '~~/shared/types/dtos/user.dto';

const login = ref<string>('');
const user = ref<UserResponseDTO | null>(null);
const findError = ref<string | null>(null);
const isLoading = ref<boolean>(false);

async function findUser() {
  isLoading.value = true;
  user.value = null;
  findError.value = null;

  try {
    const response = await $fetch<UserResponseDTO>('/api/users/find', {
      method: 'POST',
      body: { login: login.value },
    });
    user.value = response;
  } catch (err: unknown) {
    if (err instanceof FetchError) {
      findError.value = err.statusMessage ?? err.message;
    } else if (err instanceof Error) {
      findError.value = err.message;
    } else {
      findError.value = 'An unknown error occurred';
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.btn-submit {
  @apply border-2 border-blue-500 hover:border-blue-700 disabled:border-gray-500 text-black disabled:text-gray-600 font-bold py-2 px-4 rounded;
}
</style>
