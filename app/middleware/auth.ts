import { jwtVerify } from 'jose';

const APP_CONFIG = useRuntimeConfig();
const SECRET_KEY = new TextEncoder().encode(String(APP_CONFIG.jwtSecret));

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token',
    });
  }

  try {
    await jwtVerify(token, SECRET_KEY);
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
    });
  }
});
