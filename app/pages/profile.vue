<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">Профиль пользователя</h1>

    <div class="border rounded-lg p-6 space-y-4">
      <div>
        <label class="text-sm text-gray-600">Login</label>
        <input class="border w-full p-2 rounded mt-1" />
      </div>

      <div>
        <label class="text-sm text-gray-600">Email</label>
        <input class="border w-full p-2 rounded mt-1" />
      </div>

      <button class="btn-save">Сохранить</button>
    </div>
  </div>
</template>

<style scoped>
.btn-save {
  @apply bg-[#08c] hover:bg-[#0077aa] text-white px-4 py-2 rounded;
}
</style>
