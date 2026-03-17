<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { TaskCategoryDTO } from '~~/shared/dtos';

definePageMeta({
  requiresAuth: true,
});

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
  <div class="min-h-screen">
    <div class="container-custom py-16">
      <h1 class="text-2xl font-medium text-gray-900 mb-12 text-center">Категории заданий</h1>

      <div v-if="loading" class="text-center text-gray-500 py-20 text-sm">
        Загрузка категорий...
      </div>

      <div v-else-if="errorMessage" class="text-center text-red-600 py-20 text-sm">
        {{ errorMessage }}
      </div>

      <div v-else-if="categories.length === 0" class="text-center text-gray-500 py-20 text-sm">
        Пока нет доступных категорий
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/difficulties?categoryId=${category.id}`"
          class="group bg-white border border-gray-200 rounded-sm p-6 text-center transition-colors hover:border-[#08c]"
        >
          <Icon name="material-symbols:category" size="30" class="text-[#08c] mb-3" />
          <div class="text-base font-medium text-gray-900">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
