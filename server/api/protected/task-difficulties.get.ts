import useRepositories from '~~/server/plugins/repositories';

export default defineEventHandler(async (event) => {
  const { taskDifficultyRepository } = await useRepositories(event);

  const difficulties = await taskDifficultyRepository.findAll();

  return toArrayOfTaskDifficultyDTO(difficulties);
});
