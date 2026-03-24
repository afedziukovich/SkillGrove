import { createClient } from '@supabase/supabase-js';

const APP_CONFIG = useRuntimeConfig();
const SUPABASE_URL = String(APP_CONFIG.supabaseUrl);
const SUPABASE_KEY = String(APP_CONFIG.supabaseKey);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
