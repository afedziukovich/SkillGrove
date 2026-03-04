import { z } from 'zod';

export const UserCredentialsSchema = z.object({
  login: z.string().trim().min(1),
  password: z.string().min(5),
});

export type UserCredentialsDTO = z.infer<typeof UserCredentialsSchema>;

export const UpdatePasswordSchema = z.object({
  newPassword: z.string().min(5).max(100),
});

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordSchema>;

export const LoginUserSchema = z.object({
  login: z.string().trim().min(1),
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

export const UserPaginationQuerySchema = z.object({
  limit: z.coerce.number().int().positive().default(20),
  page: z.coerce.number().int().positive().default(1),
  sortBy: z.enum(['id', 'login', 'level']).default('id'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export type UserPaginationQueryDTO = z.infer<typeof UserPaginationQuerySchema>;
