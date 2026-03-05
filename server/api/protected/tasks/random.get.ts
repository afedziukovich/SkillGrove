import useRepositories from '~~/server/plugins/repositories';
import { RandomTaskParametersSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, RandomTaskParametersSchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid parameters',
    });
  }

  const { categoryId, difficultyId } = query.data;

  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { user } = event.context.auth;

  const {
    taskRepository,
    userProgressRepository,
    taskCategoryRepository,
    taskDifficultyRepository,
  } = await useRepositories(event);

  const taskCategory = await taskCategoryRepository.findById(categoryId);
  const taskDifficulty = await taskDifficultyRepository.findById(difficultyId);
  if (!taskCategory || !taskDifficulty) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No such category or difficulty',
    });
  }

  const userProgress = await userProgressRepository.findByUserId(user.id);
  const tasksByParameters = await taskRepository.findByCategoryAndDifficulty(
    categoryId,
    difficultyId
  );

  let filteredTasks = tasksByParameters.filter(
    (t) => !userProgress.some((up) => up.task_id === t.id)
  );
  if (filteredTasks.length === 0) {
    filteredTasks = tasksByParameters;
  }

  const randomIndex = Math.floor(Math.random() * filteredTasks.length);
  const randomTask = filteredTasks.at(randomIndex)!;

  return toRandomTaskDTO(randomTask, taskCategory, taskDifficulty);
});
