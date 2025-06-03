import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'astro:env/server';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
