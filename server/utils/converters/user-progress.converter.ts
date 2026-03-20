import type { UserProgress } from '~~/server/models/entities';
import type { TaskBestTryDTO } from '~~/shared/dtos';

export function toTaskBestTryDTO(progress: UserProgress): TaskBestTryDTO {
  return {
    experienceGained: progress.experience_gained,
    lastAttemptAt: progress.last_attempt_at.valueOf(),
  };
}
