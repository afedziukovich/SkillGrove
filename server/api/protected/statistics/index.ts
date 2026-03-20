import { toUserStatisticsDTO } from '~~/server/utils/converters/user-progress.converter';
import useRepositories from '~~/server/plugins/repositories';
import { useXPCurve } from '~~/server/composables/use-xp-curve';

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { user } = event.context.auth;

  const { userProgressRepository } = useRepositories(event);

  const completedTasksTotal = await userProgressRepository.countCompletedByUserId(user.id);

  const xpCurve = useXPCurve();
  const xpToNextLevel = xpCurve.getXPForLevel(user.level + 1) ?? 0;

  return toUserStatisticsDTO(user, xpToNextLevel, completedTasksTotal);
});
