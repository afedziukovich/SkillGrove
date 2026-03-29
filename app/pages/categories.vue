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
    errorMessage.value = 'Failed to load categories';
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
      <h1 class="text-3xl font-medium text-center mb-10">Task categories</h1>

      <div
        v-if="loading"
        class="flex justify-center items-center gap-2 text-center text-gray-500 py-20 text-base"
      >
        <img src="../assets/images/svg/loading.svg" class="size-4" /><span
          >Loading categories...</span
        >
      </div>

      <div v-else-if="errorMessage" class="text-center text-red-600 py-20 text-sm">
        {{ errorMessage }}
      </div>

      <div v-else-if="categories.length === 0" class="text-center text-gray-500 py-20 text-sm">
        There are no categories available yet
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/difficulties?categoryId=${category.id}`"
          class="border rounded-lg p-6 text-center hover:border-[#08c] hover:shadow-md transition"
        >
          <Icon name="material-symbols:category" size="30" class="text-[#08c] mb-3" />

          <div class="text-xl font-regular text-gray-900">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
