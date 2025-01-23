import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nyrppodnnaxodzgbdsmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cnBwb2RubmF4b2R6Z2Jkc21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NDcwMTcsImV4cCI6MjA1MzIyMzAxN30.fSyPnvDjbebjPAd9u3gNYjpoJ22uxROuhWk0gY72BE0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);