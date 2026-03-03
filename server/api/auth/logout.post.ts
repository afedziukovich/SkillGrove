import useRepositories from '~~/server/plugins/repositories';
import { toResultDTO } from '~~/server/utils/converters/common.converter';
import { AUTH_TOKEN_KEY_NAME } from '~~/shared/utils/constants';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, AUTH_TOKEN_KEY_NAME);
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token',
    });
  }

  const { sessionRepository } = await useRepositories(event);

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
