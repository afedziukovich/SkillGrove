import type { CreateUserDTO } from '~~/shared/types/dtos/user.dto';
import type { User } from '~~/server/models/user';
import useRepositories from '~~/server/plugins/repositories';
import { toUserDTO } from '~~/server/utils/converters/user.converter';
import { SignJWT } from 'jose';

const APP_CONFIG = useRuntimeConfig();
const SECRET_KEY = new TextEncoder().encode(String(APP_CONFIG.jwtSecret));
const MAX_AGE = Number(APP_CONFIG.public.jwtMaxAge);

export default defineEventHandler(async (event) => {
  const { login, password, experience = 0, level = 1 } = await readBody<CreateUserDTO>(event);
  if (!login || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Login and password are required',
    });
  }

  const { userRepository, sessionRepository } = await useRepositories(event);

  const existingUser = await userRepository.findByLogin(login);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Login already in use',
    });
  }

  const { hash: password_hash, salt } = await hashPassword(password);
  const userData: Omit<User, 'id'> = {
    login,
    password_hash,
    salt,
    experience,
    level,
  };

  const user = await userRepository.create(userData);

  const now = Math.floor(Date.now() / 1000);
  const createdDate = new Date(now * 1000);
  const expiresDate = new Date((now + MAX_AGE) * 1000);

  const token = await new SignJWT({ userId: user.id, userLogin: user.login })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(now + MAX_AGE)
    .sign(SECRET_KEY);

  sessionRepository.create({
    user_id: user.id,
    token,
    created_at: createdDate,
    expires_at: expiresDate,
  });

  setCookie(event, AUTH_TOKEN_KEY_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  });

  return toUserDTO(user);
});
