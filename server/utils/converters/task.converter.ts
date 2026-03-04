import type { Task } from '~~/server/models/task';
import type { TaskDTO } from '~~/shared/types/dtos/task.dto';

export function toTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    categoryId: task.category_id,
    difficultyId: task.difficulty_id,
  };
}
