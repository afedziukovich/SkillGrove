import type { UpdatePasswordDTO } from '~~/shared/types/dtos/user.dto';
import useRepositories from '~~/server/plugins/repositories';

export default defineEventHandler(async (event) => {
  const { newPassword } = await readBody<UpdatePasswordDTO>(event);
  if (!newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'newPassword is required',
    });
  }

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
