import type { Task } from '~~/server/models/task';
import type { ITaskRepository } from '../interfaces';
import tasksData from '~~/server/data/tasks.json';

export class MockTaskRepository implements ITaskRepository {
  private tasks: Task[];
  private idCounter: number;

  constructor() {
    this.tasks = tasksData as Task[];
    this.idCounter = Math.max(1, ...this.tasks.map((t) => t.id)) + 1;
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask = { ...task, id: this.idCounter++ };
    this.tasks.push(newTask);
    return newTask;
  }

  async findById(id: number): Promise<Task | null> {
    return this.tasks.find((t) => t.id === id) || null;
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async findByCategory(categoryId: number): Promise<Task[]> {
    return this.tasks.filter((t) => t.category_id === categoryId);
  }

  async findByDifficulty(difficultyId: number): Promise<Task[]> {
    return this.tasks.filter((t) => t.difficulty_id === difficultyId);
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index === -1) throw new Error('Task not found');
    this.tasks[index] = task;
    return task;
  }

  async deleteById(id: number): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
