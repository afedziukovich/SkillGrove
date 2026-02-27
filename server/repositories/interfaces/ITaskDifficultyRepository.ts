import type { TaskDifficulty } from '~~/server/models/task-difficulty';

export interface ITaskDifficultyRepository {
  create(difficulty: Omit<TaskDifficulty, 'id'>): Promise<TaskDifficulty>;
  findById(id: number): Promise<TaskDifficulty | null>;
  findAll(): Promise<TaskDifficulty[]>;
  update(difficulty: TaskDifficulty): Promise<TaskDifficulty>;
  deleteById(id: number): Promise<void>;
}
