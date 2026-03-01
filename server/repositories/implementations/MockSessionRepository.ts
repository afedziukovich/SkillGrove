import type { Session } from '~~/server/models/session';
import type { ISessionRepository } from '../interfaces';
import sessionsData from '~~/server/data/sessions.json';

export class MockSessionRepository implements ISessionRepository {
  private sessions: Session[];
  private idCounter: number;

  constructor() {
    this.sessions = sessionsData as Session[];
    this.idCounter = Math.max(1, ...this.sessions.map((s) => s.id)) + 1;
  }

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
