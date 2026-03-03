import type { UserPaginationQueryDTO } from '~~/shared/types/dtos/user.dto';
import useRepositories from '~~/server/plugins/repositories';
import { toArrayOfUserDTO } from '~~/server/utils/converters/user.converter';

export default defineEventHandler(async (event) => {
  const {
    limit = 20,
    page = 1,
    sortBy = 'id',
    order = 'asc',
  } = await getQuery<UserPaginationQueryDTO>(event);

  const { userRepository } = await useRepositories(event);

  const users = await userRepository.getPaginated(limit, page, sortBy, order);

  return toArrayOfUserDTO(users);
});
