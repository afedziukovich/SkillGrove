import { useXPCurve } from '~~/server/composables/use-xp-curve';
import type { AISingleAnswerRequestDTO } from '~~/server/models/dtos';
import { AISingleAnswerResponseSchema } from '~~/server/models/schemas';
import useRepositories from '~~/server/plugins/repositories';
import { TASK_JUDGMENT_INSTRUCTION } from '~~/server/prompts/system';
import { parseAiAnswer } from '~~/server/utils/parseAiAnswer';
import { toAiJudgmentFormat } from '~~/server/utils/toAiJudgmentFormat';
import { TaskSolutionSchema } from '~~/shared/schemas';

const APP_CONFIG = useRuntimeConfig();
const API_ENDPOINT_SINGLE = String(APP_CONFIG.groqApiEndpointSingle);
const API_KEY = String(APP_CONFIG.groqApiKey);
const TARGET_MODEL = String(APP_CONFIG.groqTargetModel);

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, TaskSolutionSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body data',
    });
  }

  const { taskId, solution } = body.data;

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

  const requestInput = toAiJudgmentFormat(task.description, solution);
  const response = await $fetch(API_ENDPOINT_SINGLE, {
    method: 'POST',
    body: {
      model: TARGET_MODEL,
      input: requestInput,
      instructions: TASK_JUDGMENT_INSTRUCTION,
    } as AISingleAnswerRequestDTO,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const validatedResponse = AISingleAnswerResponseSchema.parse(response);
  if (!body.success) {
    throw createError({
      statusCode: 500,
      statusMessage: 'AI API error',
    });
  }

  const { status, output } = validatedResponse;
  if (status !== 'completed') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Judgment error',
    });
  }

  const messageOutput = output.find((o) => o.type === 'message');
  if (!messageOutput || !messageOutput.content) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Judgment error',
    });
  }

  const totalRawAiMessage = messageOutput.content.map((c) => c.text).join('\n');

  const parsedAiAnswer = parseAiAnswer(totalRawAiMessage);

  const experienceToGain = Math.round(
    (difficulty.max_experience * parsedAiAnswer.correctnessPercentage) / 100
  );
  const attemptDate = new Date(Date.now());

  const taskSolutionTries = await userProgressRepository.findByUserIdAndTaskId(user.id, task.id);
  const bestTryExperience =
    taskSolutionTries.toSorted((a, b) => b.experience_gained - a.experience_gained)[0]
      ?.experience_gained ?? 0;
  const experienceToGainCorrected =
    experienceToGain - bestTryExperience >= 0 ? experienceToGain - bestTryExperience : 0;

  userProgressRepository.create({
    user_id: user.id,
    task_id: taskId,
    experience_gained: experienceToGain,
    last_attempt_at: attemptDate,
  });

  const xpCurve = useXPCurve();

  let newLevel = user.level;
  let newExperience = user.experience + experienceToGainCorrected;

  let wantLevel = newLevel + 1;
  while (wantLevel <= xpCurve.getMaxLevel()) {
    const requiredXP = xpCurve.getXPForLevel(wantLevel);

    if (requiredXP === undefined || newExperience < requiredXP) {
      break;
    }

    newExperience -= requiredXP;
    newLevel += 1;
    wantLevel += 1;
  }
  const experienceToNextLevel = xpCurve.getXPForLevel(wantLevel) ?? 0;

  const updatedUser = await userRepository.updateStatistics(user.id, newLevel, newExperience);

  return toTaskJudgmentResultDTO(
    updatedUser,
    parsedAiAnswer.correctness,
    experienceToGainCorrected,
    experienceToNextLevel,
    parsedAiAnswer.explanation
  );
});
