<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { TaskDifficultyDTO } from '~~/shared/dtos';

const route = useRoute();

const categoryId = Number(route.query.categoryId) || 1;

const difficulties = ref<TaskDifficultyDTO[]>([]);
const loading = ref(true);
const errorMessage = ref<string | null>(null);

const fetchDifficulties = async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    const data = await $fetch<TaskDifficultyDTO[]>('/api/protected/task-difficulties', {
      credentials: 'include',
    });

    difficulties.value = data;
  } catch {
    errorMessage.value = 'Failed to load difficulty levels';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDifficulties();
});
</script>

<template>
  <div class="container-custom py-16">
    <h1 class="text-3xl font-medium text-center mb-10">Select difficulty level</h1>

    <div
      v-if="loading"
      class="flex justify-center items-center gap-2 text-center text-gray-500 py-20 text-base"
    >
      <img src="../assets/images/svg/loading.svg" class="size-4" />
      <span>Loading difficulty levels...</span>
    </div>

    <div v-else-if="errorMessage" class="text-center text-red-600 py-20 text-sm">
      {{ errorMessage }}
    </div>

    <div v-else-if="difficulties.length === 0" class="text-center text-gray-500 py-20">
      There are no difficulty levels available yet.
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NuxtLink
        v-for="difficulty in difficulties"
        :key="difficulty.id"
        :to="`/task?categoryId=${categoryId}&difficultyId=${difficulty.id}`"
        class="border rounded-lg p-6 text-center hover:border-[#08c] hover:shadow-md transition"
      >
        <Icon name="material-symbols:book-4-spark-rounded" size="30" class="text-[#08c] mb-3" />

        <div class="text-xl font-regular text-gray-900">
          {{ difficulty.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
