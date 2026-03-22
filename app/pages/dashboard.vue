<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FetchError } from 'ofetch';
import type { UserStatisticsDTO } from '~~/shared/dtos';

definePageMeta({
  requiresAuth: true,
});

const toast = useToast();

const statisticsLoading = ref(true);
const statistics = ref<UserStatisticsDTO | null>();

const fetchStatistics = async () => {
  statisticsLoading.value = true;

  try {
    const response = await $fetch<UserStatisticsDTO>('/api/protected/statistics', {
      method: 'POST',
    });

    statistics.value = response;

    statisticsLoading.value = false;
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      toast.error({
        title: 'Loading Failed',
        message: 'Statistics could not be loaded. Please refresh page.',
      });
    }
  }
};

onMounted(() => {
  fetchStatistics();
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
            <p class="text-sm text-gray-500 mb-2">Уровень</p>
            <p v-if="!statisticsLoading && statistics" class="text-3xl font-light text-[#08c]">
              {{ statistics.level }}
            </p>
            <img v-if="statisticsLoading" src="../assets/images/svg/loading.svg" class="size-9" />
          </div>

          <div class="bg-white border border-gray-200 rounded-sm p-6">
            <p class="text-sm text-gray-500 mb-2">Опыт</p>
            <p v-if="!statisticsLoading && statistics" class="text-3xl font-light text-[#08c]">
              {{ statistics.experience }} / {{ statistics.experienceToNextLevel }} XP
            </p>
            <img v-if="statisticsLoading" src="../assets/images/svg/loading.svg" class="size-9" />
          </div>

          <div class="bg-white border border-gray-200 rounded-sm p-6">
            <p class="text-sm text-gray-500 mb-2">Решено задач</p>
            <p v-if="!statisticsLoading && statistics" class="text-3xl font-light text-[#08c]">
              {{ statistics.completedTasksTotal }}
            </p>
            <img v-if="statisticsLoading" src="../assets/images/svg/loading.svg" class="size-9" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
