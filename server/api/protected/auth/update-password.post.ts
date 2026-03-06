import { UpdatePasswordSchema } from '~~/shared/schemas';
import useRepositories from '~~/server/plugins/repositories';
import { toResultDTO } from '~~/shared/converters';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, UpdatePasswordSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body data',
    });
  }

  const { newPassword } = body.data;

  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
  const user = event.context.auth.user;

  const { userRepository } = await useRepositories(event);

  const { hash: newPasswordHash, salt: newSalt } = await hashPassword(newPassword);
  await userRepository.updatePassword(user.id, newPasswordHash, newSalt);

  return toResultDTO(true);
});
