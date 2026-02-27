import type { Task } from '~~/server/models/task';
import type { ITaskRepository } from '../interfaces';

export class MockTaskRepository implements ITaskRepository {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      category_id: 1,
      difficulty_id: 1,
    },
  ];
  private idCounter = 2;

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
