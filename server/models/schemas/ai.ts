import { z } from 'zod';

export const AISingleAnswerOutputContentSchema = z.object({
  type: z.enum(['output_text']),
  text: z.coerce.string(),
});

export const AISingleAnswerOutputItemSchema = z.object({
  id: z.coerce.string(),
  type: z.enum(['reasoning', 'function_call', 'message']),
  status: z.enum(['completed', 'in_progress', 'incomplete']).optional(),
  content: z.array(AISingleAnswerOutputContentSchema).optional(),
});

export const AISingleAnswerResponseSchema = z.object({
  id: z.coerce.string(),
  status: z.enum(['completed', 'failed', 'in_progress', 'incomplete']),
  output: z.array(AISingleAnswerOutputItemSchema),
});

export type AISingleAnswerOutputContentDTO = z.infer<typeof AISingleAnswerOutputContentSchema>;
export type AISingleAnswerOutputItemDTO = z.infer<typeof AISingleAnswerOutputItemSchema>;
export type AISingleAnswerResponseDTO = z.infer<typeof AISingleAnswerResponseSchema>;
