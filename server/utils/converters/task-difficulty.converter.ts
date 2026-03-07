import type { TaskDifficulty } from '~~/server/models/entities';
import type { TaskDifficultyDTO } from '~~/shared/dtos';

export function toTaskDifficultyDTO(difficulty: TaskDifficulty): TaskDifficultyDTO {
  return {
    id: difficulty.id,
    name: difficulty.name,
    maxExperience: difficulty.max_experience,
  };
}

export function toArrayOfTaskDifficultyDTO(difficulties: TaskDifficulty[]): TaskDifficultyDTO[] {
  return difficulties.map((d) => toTaskDifficultyDTO(d));
}
