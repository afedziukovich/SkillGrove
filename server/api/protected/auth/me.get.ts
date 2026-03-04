import { toUserDTO } from '~~/server/utils/converters';

export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  return toUserDTO(event.context.auth.user);
});
