import type { CreateUserDTO } from '~~/shared/types/dtos/user.dto';
import type { User } from '~~/server/models/user';
import useRepositories from '~~/server/plugins/repositories';
import { toUserResponseDTO } from '~~/server/utils/converters/user.converter';

export default defineEventHandler(async (event) => {
  const { login, password, experience = 0, level = 1 } = await readBody<CreateUserDTO>(event);

  const { hash: password_hash, salt } = await hashPassword(password);
  const userData: Omit<User, 'id'> = {
    login,
    password_hash,
    salt,
    experience,
    level,
  };

  const { userRepository } = await useRepositories(event);
  const createdUser = await userRepository.create(userData);

  return toUserResponseDTO(createdUser);
});
