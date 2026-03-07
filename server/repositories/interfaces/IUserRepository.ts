import type { User } from '~~/server/models/entities';

export interface IUserRepository {
  create(user: Omit<User, 'id'>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  getPaginated(
    limit: number,
    page: number,
    sortBy: keyof User,
    order: 'asc' | 'desc'
  ): Promise<User[]>;
  update(user: User): Promise<User>;
  updateStatistics(userId: number, level: number, experience: number): Promise<User>;
  updatePassword(userId: number, newPasswordHash: string, newSalt: string): Promise<User>;
  deleteById(id: number): Promise<void>;
}
