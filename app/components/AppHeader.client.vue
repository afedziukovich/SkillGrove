<template>
  <ClientOnly>
    <header class="sticky top-0 z-50 h-[72px] bg-white border-b border-gray-200 flex items-center">
      <div class="container mx-auto px-6 flex items-center justify-between w-full">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-2xl font-semibold tracking-tight text-[#08c]"
            >SkillGrove</NuxtLink
          >
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <NuxtLink to="/about" class="hover:text-[#08c] transition-colors">О проекте</NuxtLink>
            <NuxtLink to="/categories" class="hover:text-[#08c] transition-colors"
              >Категории</NuxtLink
            >
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              class="text-sm font-medium text-gray-700 hover:text-[#08c] transition-colors"
            >
              Войти
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-4 py-2 text-sm font-medium bg-[#08c] text-white rounded hover:bg-[#0077aa] transition-colors"
            >
              Регистрация
            </NuxtLink>
          </template>

          <template v-else>
            <div class="relative">
              <button
                class="text-sm font-medium text-gray-800 hover:text-[#08c] transition-colors"
                @click="toggleMenu"
              >
                {{ user?.login }}
              </button>
              <div
                v-if="isMenuOpen"
                class="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded shadow-lg py-2 text-sm"
              >
                <NuxtLink
                  to="/profile"
                  class="block px-4 py-2 hover:bg-gray-100"
                  @click="closeMenu"
                >
                  Редактирование профиля
                </NuxtLink>
                <NuxtLink
                  to="/settings"
                  class="block px-4 py-2 hover:bg-gray-100"
                  @click="closeMenu"
                >
                  Настройка
                </NuxtLink>
                <NuxtLink
                  to="/dashboard"
                  class="block px-4 py-2 hover:bg-gray-100"
                  @click="closeMenu"
                >
                  Дашборд
                </NuxtLink>
                <NuxtLink to="/help" class="block px-4 py-2 hover:bg-gray-100" @click="closeMenu">
                  Помощь
                </NuxtLink>
                <div class="border-t my-2"></div>
                <button
                  class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  @click="logout"
                >
                  Выйти
                </button>
              </div>
            </div>
          </template>

          <button
            class="text-gray-600 hover:text-[#08c] transition-colors"
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
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const logout = async () => {
  await authStore.logout();
  closeMenu();
  router.push('/');
};
</script>
