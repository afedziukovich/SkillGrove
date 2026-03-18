<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const features = ref([
  {
    title: 'Практические задачи',
    description: 'Решайте задачи разных категорий и уровней сложности',
    icon: '💻',
  },
  {
    title: 'AI проверка',
    description: 'Мгновенный анализ кода от искусственного интеллекта',
    icon: '🤖',
  },
  {
    title: 'Рост навыков',
    description: 'Отслеживайте прогресс и повышайте уровень',
    icon: '📈',
  },
]);

const actionLink = computed(() => {
  return authStore.isAuthenticated ? '/categories' : '/register';
});

const actionText = computed(() => {
  return authStore.isAuthenticated ? 'Выбрать категорию' : 'Начать обучение';
});
</script>

<template>
  <div class="container-custom py-16 flex flex-col gap-4">
    <div class="">
      <div class="max-w-3xl">
        <h1 class="text-3xl font-medium text-gray-900 mb-6">О проекте SkillGrove</h1>
        <p class="text-base text-gray-600 leading-relaxed">
          <strong class="text-gray-900">SkillGrove</strong> — платформа для практики JavaScript и
          TypeScript. Помогаем подготовиться к техническим интервью через реальные задачи.
        </p>
      </div>
    </div>

    <hr class="my-4 border-gray-200" />

    <div class="">
      <h2 class="text-2xl font-medium text-gray-900 mb-10 text-center">Возможности</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="text-center">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <hr class="my-4 border-gray-200" />

    <div class="text-center">
      <h2 class="text-2xl font-medium text-gray-900 mb-4">
        {{ authStore.isAuthenticated ? 'Продолжайте обучение' : 'Начните сейчас' }}
      </h2>
      <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        {{
          authStore.isAuthenticated
            ? 'Выберите категорию и приступайте к задачам'
            : 'Присоединяйтесь к сообществу разработчиков и прокачивайте свои навыки'
        }}
      </p>
      <NuxtLink :to="actionLink" class="btn btn-primary">
        {{ actionText }}
      </NuxtLink>
    </div>
  </div>
</template>
