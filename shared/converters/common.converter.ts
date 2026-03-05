import type { ResultDTO } from '~~/shared/dtos';

export function toResultDTO(success: boolean, message?: string): ResultDTO {
  return { success, message };
}
