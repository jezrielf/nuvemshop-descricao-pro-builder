// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zeiodratpawnnbgnflvi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaW9kcmF0cGF3bm5iZ25mbHZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjQxNTEsImV4cCI6MjA1OTgwMDE1MX0.QWDujyy4bwSOYFMfPhlvMp1b5xhB0QogAXi77NnCqY8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);