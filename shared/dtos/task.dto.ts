export interface TaskDTO {
  id: number;
  type: string;
  answerType: string;
  title: string;
  description: string;
  categoryId: number;
  difficultyId: number;
}

export interface TaskSolutionDTO {
  taskId: number;
  solution: string;
}
