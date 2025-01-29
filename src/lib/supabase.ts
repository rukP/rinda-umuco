import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdytvvkmdfmglrdklhxf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkeXR2dmttZGZtZ2xyZGtsaHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDc0NjAsImV4cCI6MjAyMjA4MzQ2MH0.CCkm8H_Wn8P8X0MOtmHqKACNXUeNNgxEQ_CQb6Z6Lzw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});