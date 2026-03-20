import { z } from 'zod';

export const RandomTaskParametersSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
  difficultyId: z.coerce.number().int().positive(),
});

export type RandomTaskParametersDTO = z.infer<typeof RandomTaskParametersSchema>;

export const TaskSolutionSchema = z.object({
  taskId: z.coerce.number().int().positive(),
  solution: z.string().trim().min(0),
});

export type TaskSolutionDTO = z.infer<typeof TaskSolutionSchema>;
