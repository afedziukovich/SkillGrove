import type { TaskCategory } from '~~/server/models/task-category';
import type { ITaskCategoryRepository } from '../interfaces';

export class MockTaskCategoryRepository implements ITaskCategoryRepository {
  private categories: TaskCategory[] = [{ id: 1, name: 'Category 1' }];
  private idCounter = 2;

  async create(category: Omit<TaskCategory, 'id'>): Promise<TaskCategory> {
    const newCategory = { ...category, id: this.idCounter++ };
    this.categories.push(newCategory);
    return newCategory;
  }

  async findById(id: number): Promise<TaskCategory | null> {
    return this.categories.find((c) => c.id === id) || null;
  }

  async findAll(): Promise<TaskCategory[]> {
    return [...this.categories];
  }

  async update(category: TaskCategory): Promise<TaskCategory> {
    const index = this.categories.findIndex((c) => c.id === category.id);
    if (index === -1) throw new Error('Category not found');
    this.categories[index] = category;
    return category;
  }

  async deleteById(id: number): Promise<void> {
    this.categories = this.categories.filter((c) => c.id !== id);
  }
}
