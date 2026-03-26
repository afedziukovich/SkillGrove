import type { StorageValue } from 'unstorage';

export async function useServerCache<T extends StorageValue>(key: string): Promise<T | null> {
  const storage = useStorage<T>('cache');
  return await storage.getItem(key);
}

export async function setServerCache<T extends StorageValue>(key: string, data: T): Promise<void> {
  const storage = useStorage<T>('cache');
  await storage.setItem(key, data);
}

export async function clearServerCache(key: string): Promise<void> {
  const storage = useStorage('cache');
  await storage.removeItem(key);
}
