import { UserCredentialsSchema } from '~~/shared/schemas';
import useRepositories from '~~/server/plugins/repositories';
import { SignJWT } from 'jose';

const APP_CONFIG = useRuntimeConfig();
const SECRET_KEY = new TextEncoder().encode(String(APP_CONFIG.jwtSecret));
const MAX_AGE = Number(APP_CONFIG.public.jwtMaxAge);

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, UserCredentialsSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid body data',
    });
  }

  const { login, password } = body.data;

  const { userRepository, sessionRepository } = await useRepositories(event);

  const user = await userRepository.findByLogin(login);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

  const isPasswordValid = await verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    });
  }

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
