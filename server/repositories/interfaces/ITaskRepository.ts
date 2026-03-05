import type { Task } from '~~/server/models';

export interface ITaskRepository {
  create(task: Omit<Task, 'id'>): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  findByCategory(categoryId: number): Promise<Task[]>;
  findByDifficulty(difficultyId: number): Promise<Task[]>;
  findByCategoryAndDifficulty(categoryId: number, difficultyId: number): Promise<Task[]>;
  update(task: Task): Promise<Task>;
  deleteById(id: number): Promise<void>;
}
