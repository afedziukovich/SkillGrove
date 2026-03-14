<script setup lang="ts">
import { ref, onMounted } from 'vue';

type Category = {
  id: number;
  name: string;
  tasksCount?: number;
};

const categories = ref<Category[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;

  try {
    const data = await $fetch<Category[]>('/api/protected/task-categories', {
      credentials: 'include',
    });

    categories.value = data;
  } catch (e) {
    console.error(e);
    error.value = 'Не удалось загрузить категории';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold text-center mb-12">Категории заданий</h1>

    <!-- Loading -->

    <div v-if="loading" class="text-center text-gray-500 py-20">Загрузка категорий...</div>

    <!-- Error -->

    <div v-else-if="error" class="text-center text-red-500 py-20">
      {{ error }}
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
        :to="`/tasks?categoryId=${category.id}`"
        class="group border rounded-lg p-6 text-center transition hover:border-[#08c] hover:shadow-md"
      >
        <div class="text-3xl mb-2">📚</div>

        <div class="text-lg font-semibold">
          {{ category.name }}
        </div>

        <div class="text-sm text-gray-500 mt-1">
          {{ category.tasksCount ?? 'Посмотреть задания' }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
