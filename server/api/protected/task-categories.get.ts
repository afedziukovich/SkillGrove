import type { TaskCategory } from '~~/server/models/entities';
import useRepositories from '~~/server/plugins/repositories';
import { TASK_CATEGORIES_CACHE_KEY } from '~~/server/utils/constants';
import { toArrayOfTaskCategoryDTO } from '~~/server/utils/converters/task-category.dto';
import { setServerCache, useServerCache } from '~~/server/utils/storage';

export default defineEventHandler(async (event) => {
  let categories = await useServerCache<TaskCategory[]>(TASK_CATEGORIES_CACHE_KEY);

  if (categories) {
    return toArrayOfTaskCategoryDTO(categories);
  }

  const { taskCategoryRepository } = await useRepositories(event);

  categories = await taskCategoryRepository.findAll();

  await setServerCache<TaskCategory[]>(TASK_CATEGORIES_CACHE_KEY, categories);

  return toArrayOfTaskCategoryDTO(categories);
});
