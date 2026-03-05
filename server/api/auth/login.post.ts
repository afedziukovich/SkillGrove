import { defineEventHandler, readBody, setCookie, createError } from 'h3';
import { randomUUID } from 'crypto';
import { verifyPassword } from '~~/server/utils/salted-hashing';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { login, password } = body;

  if (!login || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Login and password are required',
    });
  }

  const { userRepository, sessionRepository } = event.context.repositories;

  const user = await userRepository.findByLogin(login);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const token = randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24); // 24h

  await sessionRepository.create({
    user_id: user.id,
    token,
    created_at: now,
    expires_at: expires,
  });

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    expires,
  });

  return {
    id: user.id,
    login: user.login,
    level: user.level,
    experience: user.experience,
  };
});
