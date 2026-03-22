export interface TaskBestTryDTO {
  experienceGained: number;
  lastAttemptAt: number;
}

export interface UserStatisticsDTO {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  completedTasksTotal: number;
}
