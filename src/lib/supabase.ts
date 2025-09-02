import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Типы для таблиц
export interface User {
  id: string
  telegram_id: string
  username?: string
  first_name?: string
  last_name?: string
  created_at: string
  updated_at: string
}

export interface DailyProgress {
  id: string
  user_id: string
  date: string
  weight?: number
  water_consumed?: number
  water_goal?: number
  tasks_completed?: number
  total_tasks?: number
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  completed: boolean
  date: string
  created_at: string
  updated_at: string
}
