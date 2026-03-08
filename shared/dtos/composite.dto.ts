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
  correctness: 'Correct' | 'Partly correct' | 'Incorrect';
  experienceGained: number;
  explaination: string;
}
