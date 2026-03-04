import useRepositories from '~~/server/plugins/repositories';
import { TaskSolutionSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, TaskSolutionSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: 'Invalid body data',
    });
  }

  const { taskId } = body.data;

  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { user } = event.context.auth;

  const { taskRepository, taskDifficultyRepository, userProgressRepository, userRepository } =
    useRepositories(event);

  const task = await taskRepository.findById(taskId);
  if (!task) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No such task',
    });
  }

  const difficulty = await taskDifficultyRepository.findById(task.difficulty_id);
  if (!difficulty) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid data',
    });
  }

  const experienceToGain = Math.round(Math.random() * difficulty.max_experience); // TODO: change to AI decision
  const explaination = 'Blah blah blah'; // TODO: change to AI decision
  const attemptDate = new Date(Date.now());

  userProgressRepository.create({
    user_id: user.id,
    task_id: taskId,
    experience_gained: experienceToGain,
    last_attempt_at: attemptDate,
  });

  const updatedUser = await userRepository.updateStatistics(
    user.id,
    user.level,
    user.experience + experienceToGain
  ); // TODO: user leveling logic

  return toTaskJudgmentResultDTO(updatedUser, experienceToGain, explaination);
});
