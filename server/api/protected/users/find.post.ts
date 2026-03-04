import { LoginUserSchema } from '~~/shared/schemas';
import useRepositories from '~~/server/plugins/repositories';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, LoginUserSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body data',
    });
  }

  const { login } = body.data;

  const { userRepository } = await useRepositories(event);

  const user = await userRepository.findByLogin(login);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }

  return toUserDTO(user);
});
