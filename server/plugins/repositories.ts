import type {
  ISessionRepository,
  ITaskCategoryRepository,
  ITaskDifficultyRepository,
  ITaskRepository,
  IUserProgressRepository,
  IUserRepository,
} from '../repositories/interfaces';
import {
  MockSessionRepository,
  MockTaskCategoryRepository,
  MockTaskDifficultyRepository,
  MockTaskRepository,
  MockUserProgressRepository,
  MockUserRepository,
} from '../repositories/implementations/mock';
import {
  SupabaseSessionRepository,
  SupabaseTaskCategoryRepository,
  SupabaseTaskDifficultyRepository,
  SupabaseTaskRepository,
  SupabaseUserProgressRepository,
  SupabaseUserRepository,
} from '../repositories/implementations/supabase';

const APP_CONFIG = useRuntimeConfig();
const NUXT_USE_MOCK = `${APP_CONFIG.nuxtUseMock}`.toLowerCase() === 'true';

interface SetOfRepositories {
  userRepository: IUserRepository;
  sessionRepository: ISessionRepository;
  userProgressRepository: IUserProgressRepository;
  taskRepository: ITaskRepository;
  taskCategoryRepository: ITaskCategoryRepository;
  taskDifficultyRepository: ITaskDifficultyRepository;
}

export default defineEventHandler(() => {
  const mockRepositories: SetOfRepositories = {
    userRepository: new MockUserRepository(),
    sessionRepository: new MockSessionRepository(),
    userProgressRepository: new MockUserProgressRepository(),
    taskRepository: new MockTaskRepository(),
    taskCategoryRepository: new MockTaskCategoryRepository(),
    taskDifficultyRepository: new MockTaskDifficultyRepository(),
  };

  const supabaseRepositories: SetOfRepositories = {
    userRepository: new SupabaseUserRepository(),
    sessionRepository: new SupabaseSessionRepository(),
    userProgressRepository: new SupabaseUserProgressRepository(),
    taskRepository: new SupabaseTaskRepository(),
    taskCategoryRepository: new SupabaseTaskCategoryRepository(),
    taskDifficultyRepository: new SupabaseTaskDifficultyRepository(),
  };

  return NUXT_USE_MOCK ? mockRepositories : supabaseRepositories;
});
