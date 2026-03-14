<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const categoryId = Number(route.query.categoryId);

const difficulties = [
  { id: 1, name: 'Easy' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'Hard' },
];

const selectDifficulty = (difficultyId: number) => {
  router.push(`/task?categoryId=${categoryId}&difficultyId=${difficultyId}`);
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-bold text-center mb-10">Выберите уровень сложности</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
        v-for="difficulty in difficulties"
        :key="difficulty.id"
        class="border rounded-lg p-6 text-center hover:border-[#08c] hover:shadow-md transition"
        @click="selectDifficulty(difficulty.id)"
      >
        <div class="text-xl font-semibold">
          {{ difficulty.name }}
        </div>
      </button>
    </div>
  </div>
</template>
