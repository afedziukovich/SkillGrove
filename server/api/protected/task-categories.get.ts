import useRepositories from '~~/server/plugins/repositories';
import { toArrayOfTaskCategoryDTO } from '~~/server/utils/converters';

export default defineEventHandler(async (event) => {
  const { taskCategoryRepository } = await useRepositories(event);

  const categories = await taskCategoryRepository.findAll();

  return toArrayOfTaskCategoryDTO(categories);
});
