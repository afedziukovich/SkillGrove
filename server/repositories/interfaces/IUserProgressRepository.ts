import type { UserProgress } from '~~/server/models/user-progress';

export interface IUserProgressRepository {
  create(progress: Omit<UserProgress, 'id'>): Promise<UserProgress>;
  findById(id: number): Promise<UserProgress | null>;
  findByUserId(userId: number): Promise<UserProgress[]>;
  findByTaskId(taskId: number): Promise<UserProgress[]>;
  update(progress: UserProgress): Promise<UserProgress>;
  deleteById(id: number): Promise<void>;
}
