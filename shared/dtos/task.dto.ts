export interface TaskDTO {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  difficultyId: number;
}

export interface TaskSolutionDTO {
  taskId: number;
  solution: string;
}
