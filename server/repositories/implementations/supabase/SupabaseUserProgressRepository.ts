import { supabase } from '~~/server/utils/supabase';
import type { UserProgress } from '~~/server/models/entities';
import type { IUserProgressRepository } from '~~/server/repositories/interfaces';

export class SupabaseUserProgressRepository implements IUserProgressRepository {
  async create(progress: Omit<UserProgress, 'id'>): Promise<UserProgress> {
    const { data, error } = await supabase.from('user_progress').insert(progress).select().single();

    if (error) throw new Error(error.message);
    return data as UserProgress;
  }

  async findById(id: number): Promise<UserProgress | null> {
    const { data, error } = await supabase.from('user_progress').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as UserProgress | null;
  }

  async findByUserId(userId: number): Promise<UserProgress[]> {
    const { data, error } = await supabase.from('user_progress').select().eq('user_id', userId);

    if (error) throw new Error(error.message);
    return data as UserProgress[];
  }

  async findByTaskId(taskId: number): Promise<UserProgress[]> {
    const { data, error } = await supabase.from('user_progress').select().eq('task_id', taskId);

    if (error) throw new Error(error.message);
    return data as UserProgress[];
  }

  async findByUserIdAndTaskId(userId: number, taskId: number): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress')
      .select()
      .eq('user_id', userId)
      .eq('task_id', taskId);

    if (error) throw new Error(error.message);
    return data as UserProgress[];
  }

  async update(progress: UserProgress): Promise<UserProgress> {
    const { data, error } = await supabase
      .from('user_progress')
      .update(progress)
      .eq('id', progress.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as UserProgress;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('user_progress').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }

  async countCompletedByUserId(userId: number): Promise<number> {
    const { count, error } = await supabase
      .from('user_progress')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gt('experience_gained', 0);

    if (error) throw new Error(error.message);
    return count || 0;
  }
}
