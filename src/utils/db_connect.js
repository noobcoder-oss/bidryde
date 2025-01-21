import { createClient } from '@supabase/supabase-js';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dWNheXZmeWp0ZHJtYXNzc3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxODU1NDYsImV4cCI6MjAwNDc2MTU0Nn0.yLWo0XpHfO7IRWvBcninuiFNmrvJAk-GQgxqe7V8_UE';
const supabaseUrl = 'https://uvucayvfyjtdrmassswj.supabase.co';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;