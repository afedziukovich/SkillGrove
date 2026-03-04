import useRepositories from '~~/server/plugins/repositories';
import { createAuthMiddleware } from '~~/server/utils/api-auth-middleware';

export default defineEventHandler(async (event) => {
  const { userRepository, sessionRepository } = useRepositories(event);
  const authMiddleware = createAuthMiddleware(userRepository, sessionRepository);
  await authMiddleware(event);
});
