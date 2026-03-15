<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TaskCategoryDTO } from '~~/shared/dtos';

const categories = ref<TaskCategoryDTO[]>([]);
const loading = ref(true);
const errorMessage = ref<string | null>(null);

const fetchCategories = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    const data = await $fetch<TaskCategoryDTO[]>('/api/protected/task-categories', {
      credentials: 'include',
    });

    categories.value = data;
  } catch {
    errorMessage.value = 'Не удалось загрузить категории';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold text-center mb-12">Категории заданий</h1>

    <!-- Loading -->

    <div v-if="loading" class="text-center text-gray-500 py-20">Загрузка категорий...</div>

    <!-- Error -->

    <div v-else-if="errorMessage" class="text-center text-red-500 py-20">
      {{ errorMessage }}
    </div>

    <!-- Empty state -->

    <div v-else-if="categories.length === 0" class="text-center text-gray-500 py-20">
      Пока нет доступных категорий
    </div>

    <!-- Categories -->

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        :to="`/difficulties?categoryId=${category.id}`"
        class="group border rounded-lg p-6 text-center transition hover:border-[#08c] hover:shadow-md"
      >
        <Icon name="material-symbols:category" size="30" class="text-green-500" />

        <div class="text-lg font-semibold">
          {{ category.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
