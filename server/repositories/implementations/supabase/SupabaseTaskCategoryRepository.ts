import { supabase } from '~~/server/utils/supabase';
import type { TaskCategory } from '~~/server/models/entities';
import type { ITaskCategoryRepository } from '~~/server/repositories/interfaces';

export class SupabaseTaskCategoryRepository implements ITaskCategoryRepository {
  async create(category: Omit<TaskCategory, 'id'>): Promise<TaskCategory> {
    const { data, error } = await supabase
      .from('task_categories')
      .insert(category)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as TaskCategory;
  }

  async findById(id: number): Promise<TaskCategory | null> {
    const { data, error } = await supabase.from('task_categories').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as TaskCategory | null;
  }

  async findAll(): Promise<TaskCategory[]> {
    const { data, error } = await supabase.from('task_categories').select();

    if (error) throw new Error(error.message);
    return data as TaskCategory[];
  }

  async update(category: TaskCategory): Promise<TaskCategory> {
    const { data, error } = await supabase
      .from('task_categories')
      .update(category)
      .eq('id', category.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as TaskCategory;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('task_categories').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
