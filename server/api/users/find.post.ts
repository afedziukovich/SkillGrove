import type { LoginUserDTO } from '~~/shared/types/dtos/user.dto';
import useRepositories from '~~/server/plugins/repositories';
import { toUserResponseDTO } from '~~/server/utils/converters/user.converter';

export default defineEventHandler(async (event) => {
  const { login } = await readBody<LoginUserDTO>(event);
  if (!login) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Login is required',
    });
  }

  const { userRepository } = await useRepositories(event);
  const user = await userRepository.findByLogin(login);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  return toUserResponseDTO(user);
});
