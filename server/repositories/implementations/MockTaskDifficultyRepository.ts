import type { TaskDifficulty } from '~~/server/models/task-difficulty';
import type { ITaskDifficultyRepository } from '../interfaces';

export class MockTaskDifficultyRepository implements ITaskDifficultyRepository {
  private difficulties: TaskDifficulty[] = [{ id: 1, name: 'Easy', max_experience: 100 }];
  private idCounter = 2;

  async create(difficulty: Omit<TaskDifficulty, 'id'>): Promise<TaskDifficulty> {
    const newDifficulty = { ...difficulty, id: this.idCounter++ };
    this.difficulties.push(newDifficulty);
    return newDifficulty;
  }

  async findById(id: number): Promise<TaskDifficulty | null> {
    return this.difficulties.find((d) => d.id === id) || null;
  }

  async findAll(): Promise<TaskDifficulty[]> {
    return [...this.difficulties];
  }

  async update(difficulty: TaskDifficulty): Promise<TaskDifficulty> {
    const index = this.difficulties.findIndex((d) => d.id === difficulty.id);
    if (index === -1) throw new Error('Difficulty not found');
    this.difficulties[index] = difficulty;
    return difficulty;
  }

  async deleteById(id: number): Promise<void> {
    this.difficulties = this.difficulties.filter((d) => d.id !== id);
  }
}
