<template>
  <ClientOnly>
    <header class="sticky top-0 z-50 h-[72px] bg-white border-b border-gray-200 flex items-center">
      <div class="container mx-auto px-6 flex items-center justify-between w-full">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-xl font-medium tracking-tight text-primary">
            SkillGrove
          </NuxtLink>
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink
              to="/about"
              class="text-[15px] text-gray-700 hover:text-primary transition-colors"
            >
              О проекте
            </NuxtLink>
            <NuxtLink
              v-if="isAuthenticated"
              to="/categories"
              class="text-[15px] text-gray-700 hover:text-primary transition-colors"
            >
              Категории
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center space-x-3">
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              class="px-[19px] py-[13px] text-[14px] leading-[0.85] text-gray-700 hover:text-primary transition-colors border border-transparent rounded-sm"
            >
              Войти
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="px-[19px] py-[13px] text-[14px] leading-[0.85] font-normal border border-[#08c] rounded-sm bg-transparent text-[#08c] hover:bg-[#e6f3ff] transition-colors"
            >
              Регистрация
            </NuxtLink>
          </template>

          <template v-else>
            <div ref="userMenuRef" class="user-menu">
              <button
                class="flex items-center gap-2 px-3 py-2 text-[15px] text-gray-700 hover:bg-gray-100 rounded-sm transition-colors"
                @click="toggleMenu"
              >
                {{ user?.login }}
                <Icon name="mdi:user-circle" size="20" />
              </button>
              <div ref="dropdownRef" class="user-menu-dropdown" :class="{ open: isMenuOpen }">
                <NuxtLink to="/profile" @click="closeMenu">Редактировать профиль</NuxtLink>
                <NuxtLink to="/dashboard" @click="closeMenu">Дашборд</NuxtLink>
                <div class="divider"></div>
                <button @click="logout">Выйти</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </header>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

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

const logout = async () => {
  await authStore.logout();
  closeMenu();
  router.push('/');
};

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

<style scoped>
.user-menu {
  position: relative;
}

.user-menu-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  min-width: 200px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 2px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  z-index: 1000;
  display: none;
}

.user-menu-dropdown.open {
  display: block;
}

.user-menu-dropdown a,
.user-menu-dropdown button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.1s ease;
}

.user-menu-dropdown a:hover,
.user-menu-dropdown button:hover {
  background-color: #f3f4f6;
}

.user-menu-dropdown .divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
}
</style>
