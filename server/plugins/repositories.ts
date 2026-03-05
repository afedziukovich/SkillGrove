import {
  MockSessionRepository,
  MockTaskCategoryRepository,
  MockTaskDifficultyRepository,
  MockTaskRepository,
  MockUserProgressRepository,
  MockUserRepository,
} from '../repositories/implementations';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const userRepository = new MockUserRepository();
    const sessionRepository = new MockSessionRepository();
    const userProgressRepository = new MockUserProgressRepository();
    const taskRepository = new MockTaskRepository();
    const taskCategoryRepository = new MockTaskCategoryRepository();
    const taskDifficultyRepository = new MockTaskDifficultyRepository();

    event.context.repositories = {
      userRepository,
      sessionRepository,
      userProgressRepository,
      taskRepository,
      taskCategoryRepository,
      taskDifficultyRepository,
    };
  });
});
