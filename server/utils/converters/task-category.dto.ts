import type { TaskCategory } from '~~/server/models/task-category';
import type { TaskCategoryDTO } from '~~/shared/types/dtos/task-category.dto';

export function toTaskCategoryDTO(category: TaskCategory): TaskCategoryDTO {
  return {
    id: category.id,
    name: category.name,
  };
}

export function toArrayOfTaskCategoryDTO(categories: TaskCategory[]): TaskCategoryDTO[] {
  return categories.map((c) => toTaskCategoryDTO(c));
}
