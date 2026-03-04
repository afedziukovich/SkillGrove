import useRepositories from '~~/server/plugins/repositories';
import { toArrayOfTaskDifficultyDTO } from '~~/server/utils/converters';

export default defineEventHandler(async (event) => {
  const { taskDifficultyRepository } = await useRepositories(event);

  const difficulties = await taskDifficultyRepository.findAll();

  return toArrayOfTaskDifficultyDTO(difficulties);
});
