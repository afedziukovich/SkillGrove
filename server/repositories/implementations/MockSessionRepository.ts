import type { Session } from '~~/server/models/session';
import type { ISessionRepository } from '../interfaces';

export class MockSessionRepository implements ISessionRepository {
  private sessions: Session[] = [];
  private idCounter = 1;

  async create(session: Omit<Session, 'id'>): Promise<Session> {
    const newSession = { ...session, id: this.idCounter++ };
    this.sessions.push(newSession);
    return newSession;
  }

  async findById(id: number): Promise<Session | null> {
    return this.sessions.find((s) => s.id === id) || null;
  }

  async findByToken(token: string): Promise<Session | null> {
    return this.sessions.find((s) => s.token === token) || null;
  }

  async deleteById(id: number): Promise<void> {
    this.sessions = this.sessions.filter((s) => s.id !== id);
  }

  async deleteByUserId(userId: number): Promise<void> {
    this.sessions = this.sessions.filter((s) => s.user_id !== userId);
  }
}
