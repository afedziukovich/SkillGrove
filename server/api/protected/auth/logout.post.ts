import useRepositories from '~~/server/plugins/repositories';
import { AUTH_TOKEN_KEY_NAME } from '~~/shared/utils/constants';

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { sessionRepository } = await useRepositories(event);

  const token = event.context.auth.token;
  await sessionRepository.deleteByToken(token);

  setCookie(event, AUTH_TOKEN_KEY_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return toResultDTO(true);
});
