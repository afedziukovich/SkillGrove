import { supabase } from '~~/server/utils/supabase';
import type { TaskDifficulty } from '~~/server/models/entities';
import type { ITaskDifficultyRepository } from '~~/server/repositories/interfaces';

export class SupabaseTaskDifficultyRepository implements ITaskDifficultyRepository {
  async create(difficulty: Omit<TaskDifficulty, 'id'>): Promise<TaskDifficulty> {
    const { data, error } = await supabase
      .from('task_difficulties')
      .insert(difficulty)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as TaskDifficulty;
  }

  async findById(id: number): Promise<TaskDifficulty | null> {
    const { data, error } = await supabase.from('task_difficulties').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as TaskDifficulty | null;
  }

  async findAll(): Promise<TaskDifficulty[]> {
    const { data, error } = await supabase.from('task_difficulties').select();

    if (error) throw new Error(error.message);
    return data as TaskDifficulty[];
  }

  async update(difficulty: TaskDifficulty): Promise<TaskDifficulty> {
    const { data, error } = await supabase
      .from('task_difficulties')
      .update(difficulty)
      .eq('id', difficulty.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as TaskDifficulty;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('task_difficulties').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
