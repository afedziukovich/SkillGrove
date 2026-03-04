import useRepositories from '~~/server/plugins/repositories';

export default defineEventHandler(async (event) => {
  const { taskCategoryRepository } = await useRepositories(event);

  const categories = await taskCategoryRepository.findAll();

  return toArrayOfTaskCategoryDTO(categories);
});
