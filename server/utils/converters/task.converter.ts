import type { Task } from '~~/server/models/entities';
import type { TaskDTO } from '~~/shared/dtos';

export function toTaskDTO(task: Task): TaskDTO {
  return {
    id: task.id,
    type: task.type,
    answerType: task.answer_type,
    title: task.title,
    description: task.description,
    categoryId: task.category_id,
    difficultyId: task.difficulty_id,
  };
}
