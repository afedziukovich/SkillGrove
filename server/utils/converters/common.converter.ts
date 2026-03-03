import type { ResultDTO } from '~~/shared/types/dtos/common.dto';

export function toResultDTO(success: boolean, message?: string): ResultDTO {
  return { success, message };
}
