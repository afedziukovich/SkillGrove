import type { User } from '~~/server/models/user';
import type { UserResponseDTO } from '~~/shared/types/dtos/user.dto';

export function toUserResponseDTO(user: User): UserResponseDTO {
  const { password_hash, salt, ...userData } = user;
  return userData;
}
