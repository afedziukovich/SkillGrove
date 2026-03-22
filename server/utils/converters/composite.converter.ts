import type { RandomTaskDTO, TaskJudgmentResultDTO } from '~~/shared/dtos';
import type {
  User,
  Task,
  TaskCategory,
  TaskDifficulty,
  UserProgress,
} from '~~/server/models/entities';
import { toTaskDTO } from './task.converter';
import { toTaskBestTryDTO } from './user-progress.converter';

export function toRandomTaskDTO(
  task: Task,
  category: TaskCategory,
  difficulty: TaskDifficulty,
  progress?: UserProgress
): RandomTaskDTO {
  return {
    task: toTaskDTO(task),
    category: toTaskCategoryDTO(category),
    difficulty: toTaskDifficultyDTO(difficulty),
    bestTry: progress && toTaskBestTryDTO(progress),
  };
}

export function toTaskJudgmentResultDTO(
  user: User,
  correctness: 'Correct' | 'Partly correct' | 'Incorrect',
  experienceGained: number,
  experienceToNextLevel: number,
  explaination: string
): TaskJudgmentResultDTO {
  return {
    user: toUserDTO(user),
    correctness,
    experienceGained,
    experienceToNextLevel,
    explaination,
  };
}
