import type { User } from '~~/server/models/user';

export interface IUserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  update(user: User): Promise<User>;
  updatePassword(userId: number, newPasswordHash: string, newSalt: string): Promise<User>;
  deleteById(id: number): Promise<void>;
}
