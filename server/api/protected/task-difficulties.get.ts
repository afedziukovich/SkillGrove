import type { TaskDifficulty } from '~~/server/models/entities';
import useRepositories from '~~/server/plugins/repositories';
import { TASK_DIFFICULTIES_CACHE_KEY } from '~~/server/utils/constants';
import { toArrayOfTaskDifficultyDTO } from '~~/server/utils/converters/task-difficulty.converter';
import { setServerCache, useServerCache } from '~~/server/utils/storage';

export default defineEventHandler(async (event) => {
  let difficulties = await useServerCache<TaskDifficulty[]>(TASK_DIFFICULTIES_CACHE_KEY);

  if (difficulties) {
    return toArrayOfTaskDifficultyDTO(difficulties);
  }

  const { taskDifficultyRepository } = await useRepositories(event);

  difficulties = await taskDifficultyRepository.findAll();

  await setServerCache<TaskDifficulty[]>(TASK_DIFFICULTIES_CACHE_KEY, difficulties);

  return toArrayOfTaskDifficultyDTO(difficulties);
});
