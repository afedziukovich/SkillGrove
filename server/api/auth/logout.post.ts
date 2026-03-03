import { defineEventHandler, getCookie, deleteCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (token) {
    const { sessionRepository } = event.context.repositories;
    const session = await sessionRepository.findByToken(token);
    if (session) {
      await sessionRepository.deleteById(session.id);
    }
    deleteCookie(event, 'auth_token');
  }
  return { success: true };
});
