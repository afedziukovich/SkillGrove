import type { ResultDTO } from '~~/shared/types/dtos';

export function toResultDTO(success: boolean, message?: string): ResultDTO {
  return { success, message };
}
