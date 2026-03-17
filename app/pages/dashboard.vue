<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});
</script>

<template>
  <div class="min-h-screen">
    <div class="container-custom py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-medium text-gray-900 mb-8">Dashboard</h1>

        <p class="text-sm text-gray-500 mb-8">Здесь отображается прогресс пользователя.</p>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white border border-gray-200 rounded-sm p-6">
            <p class="text-sm text-gray-500 mb-2">Решено задач</p>
            <p class="text-3xl font-light text-[#08c]">0</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-sm p-6">
            <p class="text-sm text-gray-500 mb-2">Опыт</p>
            <p class="text-3xl font-light text-[#08c]">0 XP</p>
          </div>

          <div class="bg-white border border-gray-200 rounded-sm p-6">
            <p class="text-sm text-gray-500 mb-2">Уровень</p>
            <p class="text-3xl font-light text-[#08c]">1</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
