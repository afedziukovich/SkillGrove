import type { Session } from '~~/server/models/session';

export interface ISessionRepository {
  create(session: Omit<Session, 'id'>): Promise<Session>;
  findById(id: number): Promise<Session | null>;
  findByToken(token: string): Promise<Session | null>;
  deleteById(id: number): Promise<void>;
  deleteByUserId(userId: number): Promise<void>;
}
