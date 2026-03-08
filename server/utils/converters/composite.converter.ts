import type { RandomTaskDTO, TaskJudgmentResultDTO } from '~~/shared/dtos';
import type { User, Task, TaskCategory, TaskDifficulty } from '~~/server/models/entities';
import { toTaskDTO } from './task.converter';

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
  correctness: 'Correct' | 'Partly correct' | 'Incorrect',
  experienceGained: number,
  explaination: string
): TaskJudgmentResultDTO {
  return {
    user: toUserDTO(user),
    correctness,
    experienceGained,
    explaination,
  };
}
