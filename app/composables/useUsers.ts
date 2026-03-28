import type { UserDTO } from '#shared/dtos';

export const useUsers = () => {
  const users = ref<UserDTO[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const currentPage = ref(1);

  const sortBy = ref<'login' | 'level'>('level');
  const sortOrder = ref<'asc' | 'desc'>('desc');

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<UserDTO[]>(
        '/api/protected/users',

        {
          params: {
            limit: 20,
            page: currentPage.value,
            sortBy: sortBy.value,
            order: sortOrder.value,
          },
          credentials: 'include',
        }
      );

      users.value = data;
    } catch (err) {
      console.error(err);

      error.value = 'Не удалось загрузить пользователей';
    } finally {
      loading.value = false;
    }
  };

  const changePage = (page: number) => {
    if (page < 1) return;

    currentPage.value = page;

    fetchUsers();
  };

  const changeSort = (field: 'login' | 'level') => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = field;
      sortOrder.value = 'desc';
    }

    fetchUsers();
  };

  return {
    users,
    loading,
    error,

    currentPage,

    sortBy,
    sortOrder,

    fetchUsers,
    changePage,
    changeSort,
  };
};
