import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    return;
  }

  const repositories = event.context.repositories;

  if (!repositories) {
    return;
  }

  const { sessionRepository, userRepository } = repositories;

  const session = await sessionRepository.findByToken?.(token);

  if (!session) {
    return;
  }

  const now = new Date();

  if (new Date(session.expires_at) < now) {
    return;
  }

  const user = await userRepository.findById(session.user_id);

  if (!user) {
    return;
  }

  event.context.user = user;
});
