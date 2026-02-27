import {
  MockSessionRepository,
  MockTaskCategoryRepository,
  MockTaskDifficultyRepository,
  MockTaskRepository,
  MockUserProgressRepository,
  MockUserRepository,
} from '../repositories/implementations';

export default defineEventHandler(() => {
  const userRepository =
    process.env.NUXT_USE_MOCK === 'true' ? new MockUserRepository() : new MockUserRepository(); // TODO: replace last with real data source
  const sessionRepository =
    process.env.NUXT_USE_MOCK === 'true'
      ? new MockSessionRepository()
      : new MockSessionRepository(); // TODO: replace last with real data source
  const userProgressRepository =
    process.env.NUXT_USE_MOCK === 'true'
      ? new MockUserProgressRepository()
      : new MockUserProgressRepository(); // TODO: replace last with real data source
  const taskRepository =
    process.env.NUXT_USE_MOCK === 'true' ? new MockTaskRepository() : new MockTaskRepository(); // TODO: replace last with real data source
  const taskCategoryRepository =
    process.env.NUXT_USE_MOCK === 'true'
      ? new MockTaskCategoryRepository()
      : new MockTaskCategoryRepository(); // TODO: replace last with real data source
  const taskDifficultyRepository =
    process.env.NUXT_USE_MOCK === 'true'
      ? new MockTaskDifficultyRepository()
      : new MockTaskDifficultyRepository(); // TODO: replace last with real data source

  return {
    userRepository,
    sessionRepository,
    userProgressRepository,
    taskRepository,
    taskCategoryRepository,
    taskDifficultyRepository,
  };
});
