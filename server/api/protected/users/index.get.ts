import { UserPaginationQuerySchema } from '~~/shared/schemas';
import useRepositories from '~~/server/plugins/repositories';
import { toArrayOfUserDTO } from '~~/server/utils/converters/user.converter';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, UserPaginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters',
    });
  }

  const { limit, page, sortBy, order } = query.data;

  const { userRepository } = await useRepositories(event);

  const users = await userRepository.getPaginated(limit, page, sortBy, order);

  return toArrayOfUserDTO(users);
});
