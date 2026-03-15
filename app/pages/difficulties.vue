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
    errorMessage.value = 'Не удалось загрузить уровни сложности';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDifficulties();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold text-center mb-10">Выберите уровень сложности</h1>

    <!-- Loading -->

    <div v-if="loading" class="text-center text-gray-500 py-20">Загрузка уровней сложности...</div>

    <!-- Error -->

    <div v-else-if="errorMessage" class="text-center text-red-500 py-20">
      {{ errorMessage }}
    </div>

    <!-- Empty state -->

    <div v-else-if="difficulties.length === 0" class="text-center text-gray-500 py-20">
      Пока нет доступных уровней сложности
    </div>

    <!-- Difficulties -->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="difficulty in difficulties"
        :key="difficulty.id"
        :to="`/task?categoryId=${categoryId}&difficultyId=${difficulty.id}`"
        class="border rounded-lg p-6 text-center hover:border-[#08c] hover:shadow-md transition"
      >
        <Icon name="material-symbols:book-4-spark-rounded" size="30" class="text-green-500" />

        <div class="text-xl font-semibold">
          {{ difficulty.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
