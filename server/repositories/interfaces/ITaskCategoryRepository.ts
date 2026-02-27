import type { TaskCategory } from '~~/server/models/task-category';

export interface ITaskCategoryRepository {
  create(category: Omit<TaskCategory, 'id'>): Promise<TaskCategory>;
  findById(id: number): Promise<TaskCategory | null>;
  findAll(): Promise<TaskCategory[]>;
  update(category: TaskCategory): Promise<TaskCategory>;
  deleteById(id: number): Promise<void>;
}
