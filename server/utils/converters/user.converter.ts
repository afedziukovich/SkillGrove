import type { User } from '~~/server/models';
import type { UserDTO } from '~~/shared/types/dtos';

export function toUserDTO(user: User): UserDTO {
  const { password_hash, salt, ...userData } = user;
  return userData;
}

export function toArrayOfUserDTO(users: User[]): UserDTO[] {
  return users.map((u) => toUserDTO(u));
}
