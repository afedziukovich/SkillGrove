<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold">Dashboard</h1>

    <p class="text-gray-600">Здесь отображается прогресс пользователя.</p>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="border rounded-lg p-6">
        <p class="text-gray-500 text-sm">Решено задач</p>
        <p class="text-2xl font-bold mt-2">0</p>
      </div>

      <div class="border rounded-lg p-6">
        <p class="text-gray-500 text-sm">Опыт</p>
        <p class="text-2xl font-bold mt-2">0 XP</p>
      </div>

      <div class="border rounded-lg p-6">
        <p class="text-gray-500 text-sm">Уровень</p>
        <p class="text-2xl font-bold mt-2">1</p>
      </div>
    </div>
  </div>
</template>
