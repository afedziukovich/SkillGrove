import type { TaskCategory } from '~~/server/models/entities';
import type { TaskCategoryDTO } from '~~/shared/dtos';

export function toTaskCategoryDTO(category: TaskCategory): TaskCategoryDTO {
  return {
    id: category.id,
    name: category.name,
  };
}

export function toArrayOfTaskCategoryDTO(categories: TaskCategory[]): TaskCategoryDTO[] {
  return categories.map((c) => toTaskCategoryDTO(c));
}
