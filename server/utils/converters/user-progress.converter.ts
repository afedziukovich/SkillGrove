import type { User, UserProgress } from '~~/server/models/entities';
import type { TaskBestTryDTO, UserStatisticsDTO } from '~~/shared/dtos';

export function toTaskBestTryDTO(progress: UserProgress): TaskBestTryDTO {
  return {
    experienceGained: progress.experience_gained,
    lastAttemptAt: progress.last_attempt_at.valueOf(),
  };
}

export function toUserStatisticsDTO(
  user: User,
  experienceToNextLevel: number,
  completedTasksTotal: number
): UserStatisticsDTO {
  return {
    level: user.level,
    experience: user.experience,
    experienceToNextLevel,
    completedTasksTotal,
  };
}
