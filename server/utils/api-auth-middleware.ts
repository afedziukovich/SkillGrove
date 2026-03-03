import { jwtVerify } from 'jose';
import type { ISessionRepository, IUserRepository } from '../repositories/interfaces';

const APP_CONFIG = useRuntimeConfig();
const SECRET_KEY = new TextEncoder().encode(String(APP_CONFIG.jwtSecret));

export function createAuthMiddleware(
  userRepository: IUserRepository,
  sessionRepository: ISessionRepository
) {
  return defineEventHandler(async (event) => {
    if (event.method === 'OPTIONS') return;

    if (!event.path.startsWith('/api/protected')) {
      return;
    }

    const token = getCookie(event, AUTH_TOKEN_KEY_NAME);
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      });
    }

    let tokenPayload;
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      tokenPayload = payload;
    } catch {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      });
    }

    const userId = tokenPayload.userId as number;
    const user = await userRepository.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    const session = await sessionRepository.findByToken(token);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Session not found',
      });
    }

    event.context.auth = {
      user,
      session,
      token,
    };
  });
}
