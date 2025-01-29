import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdytvvkmdfmglrdklhxf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkeXR2dmttZGZtZ2xyZGtsaHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzM0MzMsImV4cCI6MjA1MzcwOTQzM30.vvmmq3yPVCirx2VkblhCjkGDTJUU9Tx9CIo5YtPCci0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});