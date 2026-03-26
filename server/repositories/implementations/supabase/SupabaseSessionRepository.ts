import { supabase } from '~~/server/utils/supabase';
import type { Session } from '~~/server/models/entities';
import type { ISessionRepository } from '~~/server/repositories/interfaces';

export class SupabaseSessionRepository implements ISessionRepository {
  async create(session: Omit<Session, 'id'>): Promise<Session> {
    const { data, error } = await supabase.from('sessions').insert(session).select().single();

    if (error) throw new Error(error.message);
    return data as Session;
  }

  async findById(id: number): Promise<Session | null> {
    const { data, error } = await supabase.from('sessions').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as Session | null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const { data, error } = await supabase.from('sessions').select().eq('token', token).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as Session | null;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('sessions').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }

  async deleteByUserId(userId: number): Promise<void> {
    const { error } = await supabase.from('sessions').delete().eq('user_id', userId);

    if (error) throw new Error(error.message);
  }

  async deleteByToken(token: string): Promise<void> {
    const { error } = await supabase.from('sessions').delete().eq('token', token);

    if (error) throw new Error(error.message);
  }
}
