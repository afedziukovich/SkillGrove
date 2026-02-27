import type { UpdatePasswordDTO } from '~~/shared/types/dtos/user.dto';
import useRepositories from '~~/server/plugins/repositories';
import { toUserResponseDTO } from '~~/server/utils/converters/user.converter';

export default defineEventHandler(async (event) => {
  const { userId, newPassword } = await readBody<UpdatePasswordDTO>(event);
  if (!userId || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'userId and newPassword are required',
    });
  }

  const { hash: newPasswordHash, salt: newSalt } = await hashPassword(newPassword);

  const { userRepository } = await useRepositories(event);
  const updatedUser = await userRepository.updatePassword(userId, newPasswordHash, newSalt);

  return {
    success: true,
    user: toUserResponseDTO(updatedUser),
  };
});
