<script setup lang="ts">
import { useUsers } from '~/composables/useUsers';

definePageMeta({
  requiresAuth: true,
});

const {
  users,
  loading,
  error,
  currentPage,
  sortBy,
  sortOrder,
  changePage,
  changeSort,
  fetchUsers,
} = useUsers();

onMounted(fetchUsers);

const getRank = (index: number) => {
  return (currentPage.value - 1) * 20 + index + 1;
};
</script>

<template>
  <div class="min-h-screen">
    <div class="container-custom py-16">
      <h1 class="text-3xl font-medium mb-10">Таблица лидеров</h1>

      <div
        v-if="loading"
        class="flex justify-center items-center gap-2 text-gray-500 py-20 text-base"
      >
        <img src="../assets/images/svg/loading.svg" class="size-4" />
        Загрузка пользователей...
      </div>

      <div v-else-if="error" class="text-center text-red-600 py-20 text-sm">
        {{ error }}
      </div>

      <div v-else class="border rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="border-b bg-gray-50">
            <tr class="text-sm text-gray-600">
              <th class="px-6 py-3 text-left">#</th>

              <th class="px-6 py-3 text-left cursor-pointer" @click="changeSort('login')">
                Логин
                <span v-if="sortBy === 'login'">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>

              <th class="px-6 py-3 text-left cursor-pointer" @click="changeSort('level')">
                Уровень
                <span v-if="sortBy === 'level'">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>

              <th class="px-6 py-3 text-left">XP</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user, index) in users" :key="user.id" class="border-b hover:bg-gray-50">
              <td class="px-6 py-4 text-gray-500">
                {{ getRank(index) }}
              </td>

              <td class="px-6 py-4">
                <NuxtLink :to="`/profile?id=${user.id}`" class="hover:text-[#08c] transition">
                  {{ user.login }}
                </NuxtLink>
              </td>

              <td class="px-6 py-4 text-[#08c]">
                {{ user.level }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ user.experience }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end gap-2 px-6 py-4 text-sm">
          <button
            class="border px-3 py-1 rounded-sm"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            ←
          </button>

          <button class="border px-3 py-1 rounded-sm" @click="changePage(currentPage + 1)">
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
