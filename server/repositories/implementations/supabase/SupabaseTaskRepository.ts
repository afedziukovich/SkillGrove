import { supabase } from '~~/server/utils/supabase';
import type { Task } from '~~/server/models/entities';
import type { ITaskRepository } from '~~/server/repositories/interfaces';

export class SupabaseTaskRepository implements ITaskRepository {
  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const { data, error } = await supabase.from('tasks').insert(task).select().single();

    if (error) throw new Error(error.message);
    return data as Task;
  }

  async findById(id: number): Promise<Task | null> {
    const { data, error } = await supabase.from('tasks').select().eq('id', id).single();

    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data as Task | null;
  }

  async findAll(): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select();

    if (error) throw new Error(error.message);
    return data as Task[];
  }

  async findByCategory(categoryId: number): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select().eq('category_id', categoryId);

    if (error) throw new Error(error.message);
    return data as Task[];
  }

  async findByDifficulty(difficultyId: number): Promise<Task[]> {
    const { data, error } = await supabase.from('tasks').select().eq('difficulty_id', difficultyId);

    if (error) throw new Error(error.message);
    return data as Task[];
  }

  async findByCategoryAndDifficulty(categoryId: number, difficultyId: number): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .eq('category_id', categoryId)
      .eq('difficulty_id', difficultyId);

    if (error) throw new Error(error.message);
    return data as Task[];
  }

  async update(task: Task): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Task;
  }

  async deleteById(id: number): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
