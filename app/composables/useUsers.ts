import type { UserDTO } from '#shared/dtos';

interface UsersResponse {
  data: UserDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UsersFilters {
  limit: number;
  page: number;
  sortBy: string;
  order: 'asc' | 'desc';
  search?: string;
}

export const useUsers = () => {
  const toast = useToast();
  const users = ref<UserDTO[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const currentPage = ref(1);
  const totalPages = ref(1);
  const totalUsers = ref(0);
  const limit = ref(20);

  const sortBy = ref<'login' | 'level' | 'experience'>('level');
  const sortOrder = ref<'asc' | 'desc'>('desc');
  const searchQuery = ref('');

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const params: UsersFilters = {
        limit: limit.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        order: sortOrder.value,
      };

      if (searchQuery.value.trim()) {
        params.search = searchQuery.value.trim();
      }

      const response = await $fetch<UsersResponse>('/api/protected/users', {
        params,
        credentials: 'include',
      });

      users.value = response.data;
      totalPages.value = response.totalPages;
      totalUsers.value = response.total;
      currentPage.value = response.page;
    } catch {
      error.value = 'Не удалось загрузить пользователей';
      toast.error({
        title: 'Ошибка',
        message: error.value,
      });
    } finally {
      loading.value = false;
    }
  };

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    fetchUsers();
  };

  const changeSort = (field: 'login' | 'level' | 'experience') => {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = field;
      sortOrder.value = 'desc';
    }
    currentPage.value = 1;
    fetchUsers();
  };

  const searchUsers = () => {
    currentPage.value = 1;
    fetchUsers();
  };

  const resetSearch = () => {
    searchQuery.value = '';
    currentPage.value = 1;
    fetchUsers();
  };

  return {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    totalUsers,
    limit,
    sortBy,
    sortOrder,
    searchQuery,
    fetchUsers,
    changePage,
    changeSort,
    searchUsers,
    resetSearch,
  };
};
