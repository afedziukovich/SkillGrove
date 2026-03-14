<template>
  <ClientOnly>
    <header class="sticky top-0 z-50 h-[72px] bg-white border-b border-gray-200 flex items-center">
      <div class="container mx-auto px-6 flex items-center justify-between w-full">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-2xl font-semibold tracking-tight text-primary">
            SkillGrove
          </NuxtLink>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <NuxtLink to="/about" class="hover:text-primary transition-colors">О проекте</NuxtLink>
            <NuxtLink to="/courses" class="hover:text-primary transition-colors">Курсы</NuxtLink>
            <template v-if="isAuthenticated">
              <NuxtLink
                :to="`/task?categoryId=${Math.floor(Math.random() * 9) + 1}&difficultyId=${Math.floor(Math.random() * 3) + 1}`"
                class="hover:text-primary transition-colors"
                >Find Task</NuxtLink
              >
            </template>
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="btn btn-ghost"> Войти </NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary"> Регистрация </NuxtLink>
          </template>

          <template v-else>
            <div ref="userMenuRef" class="user-menu">
              <button class="user-menu-button" @click="toggleMenu">
                {{ user?.login }}
              </button>
              <div ref="dropdownRef" class="user-menu-dropdown" :class="{ open: isMenuOpen }">
                <NuxtLink to="/profile" @click="closeMenu">Редактирование профиля</NuxtLink>
                <NuxtLink to="/settings" @click="closeMenu">Настройка</NuxtLink>
                <NuxtLink to="/dashboard" @click="closeMenu">Дашборд</NuxtLink>
                <NuxtLink to="/help" @click="closeMenu">Помощь</NuxtLink>
                <div class="divider"></div>
                <button @click="logout">Выйти</button>
              </div>
            </div>
          </template>

          <button
            class="text-gray-600 hover:text-primary transition-colors"
            aria-label="Выбор языка"
          >
            🌍
          </button>
        </div>
      </div>
    </header>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const isMenuOpen = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const logout = () => {
  authStore.logout();
  closeMenu();
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
