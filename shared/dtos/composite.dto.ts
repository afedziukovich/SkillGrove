import type { TaskCategoryDTO } from './task-category.dto';
import type { TaskDifficultyDTO } from './task-difficulty.dto';
import type { TaskDTO } from './task.dto';
import type { UserDTO } from './user.dto';

export interface RandomTaskDTO {
  task: TaskDTO;
  category: TaskCategoryDTO;
  difficulty: TaskDifficultyDTO;
}

export interface TaskJudgmentResultDTO {
  user: UserDTO;
  experienceGained: number;
  explaination: string;
}
