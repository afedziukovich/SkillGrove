import { supabase } from '~~/server/utils/supabase';
import type { User } from '~~/server/models/entities';
import type { IUserRepository } from '~~/server/repositories/interfaces';

export class SupabaseUserRepository implements IUserRepository {
  async create(user: Omit<User, 'id'>): Promise<User> {
    const { data, error } = await supabase.from('users').insert(user).select().single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async findById(id: number): Promise<User | null> {
    const { data, error } = await supabase.from('users').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as User | null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const { data, error } = await supabase.from('users').select().eq('login', login).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as User | null;
  }

  async getPaginated(
    limit: number,
    page: number,
    sortBy: keyof User,
    order: 'asc' | 'desc'
  ): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select()
      .order(sortBy as string, { ascending: order === 'asc' })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw new Error(error.message);
    return data as User[];
  }

  async update(user: User): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async updateStatistics(userId: number, level: number, experience: number): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ level, experience })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async updatePassword(userId: number, newPasswordHash: string, newSalt: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ password_hash: newPasswordHash, salt: newSalt })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
