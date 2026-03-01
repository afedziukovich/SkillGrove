import type { UserProgress } from '~~/server/models/user-progress';
import type { IUserProgressRepository } from '../interfaces';
import progressData from '~~/server/data/user-progress.json';

export class MockUserProgressRepository implements IUserProgressRepository {
  private progress: UserProgress[];
  private idCounter: number;

  constructor() {
    this.progress = progressData as UserProgress[];
    this.idCounter = Math.max(1, ...this.progress.map((p) => p.id)) + 1;
  }

  async create(progress: Omit<UserProgress, 'id'>): Promise<UserProgress> {
    const newProgress = { ...progress, id: this.idCounter++ };
    this.progress.push(newProgress);
    return newProgress;
  }

  async findById(id: number): Promise<UserProgress | null> {
    return this.progress.find((p) => p.id === id) || null;
  }

  async findByUserId(userId: number): Promise<UserProgress[]> {
    return this.progress.filter((p) => p.user_id === userId);
  }

  async findByTaskId(taskId: number): Promise<UserProgress[]> {
    return this.progress.filter((p) => p.task_id === taskId);
  }

  async update(progress: UserProgress): Promise<UserProgress> {
    const index = this.progress.findIndex((p) => p.id === progress.id);
    if (index === -1) throw new Error('Progress not found');
    this.progress[index] = progress;
    return progress;
  }

  async deleteById(id: number): Promise<void> {
    this.progress = this.progress.filter((p) => p.id !== id);
  }
}
