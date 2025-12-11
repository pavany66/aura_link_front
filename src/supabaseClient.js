import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Create a .env file in the `client` folder
// and add your Supabase URL and Key there
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);