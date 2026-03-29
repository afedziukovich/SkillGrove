import { FetchError } from 'ofetch';
import type { UserDTO } from '#shared/dtos';

export const useUsers = () => {
  const toast = useToast();

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
      const urlParams = new URLSearchParams();

      urlParams.append('limit', '20');
      urlParams.append('page', String(currentPage.value));
      urlParams.append('sortBy', sortBy.value);
      urlParams.append('order', sortOrder.value);

      const response = await fetch(
        `/api/protected/users?${urlParams.toString()}`,

        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Loading error');
      }

      const data: UserDTO[] = await response.json();

      users.value = data || [];
    } catch (err: unknown) {
      if (err instanceof FetchError) {
        error.value = 'Failed to load users';

        toast.error({
          title: 'Error',
          message: error.value,
        });
      }
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

    currentPage.value = 1;

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
