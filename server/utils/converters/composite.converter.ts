import type { Task } from '~~/server/models/task';
import type { TaskCategory } from '~~/server/models/task-category';
import type { TaskDifficulty } from '~~/server/models/task-difficulty';
import type { RandomTaskDTO, TaskJudgmentResultDTO } from '~~/shared/types/dtos/composite.dto';
import { toTaskDTO } from './task.converter';
import type { User } from '~~/server/models/user';

export function toRandomTaskDTO(
  task: Task,
  category: TaskCategory,
  difficulty: TaskDifficulty
): RandomTaskDTO {
  return {
    task: toTaskDTO(task),
    category: toTaskCategoryDTO(category),
    difficulty: toTaskDifficultyDTO(difficulty),
  };
}
export function toTaskJudgmentResultDTO(
  user: User,
  experienceGained: number,
  explaination: string
): TaskJudgmentResultDTO {
  return {
    user: toUserDTO(user),
    experienceGained: experienceGained,
    explaination: explaination,
  };
}
