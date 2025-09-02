// Полностью убираем Supabase и настраиваем работу с нашим API
const API_BASE_URL = 'https://morachkovskiyapp.com/api';

// Функции для работы с API
export const api = {
  // Получить прогресс пользователя
  async getDailyProgress(userId: string, date: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/today?user_id=${encodeURIComponent(userId)}`);
      if (!response.ok) throw new Error('Failed to fetch progress');
      return await response.json();
    } catch (error) {
      console.error('Error fetching daily progress:', error);
      return null;
    }
  },

  // Обновить прогресс
  async updateProgress(userId: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/progress/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ...data })
      });
      if (!response.ok) throw new Error('Failed to update progress');
      return await response.json();
    } catch (error) {
      console.error('Error updating progress:', error);
      return null;
    }
  },

  // Получить состояние пользователя
  async getUserState(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/state?user_id=${encodeURIComponent(userId)}`);
      if (!response.ok) throw new Error('Failed to fetch user state');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user state:', error);
      return { onboarding_done: false, subscription_tier: null };
    }
  },

  // Сохранить данные анкеты
  async saveOnboarding(userId: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/onboarding/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, data })
      });
      if (!response.ok) throw new Error('Failed to save onboarding');
      return await response.json();
    } catch (error) {
      console.error('Error saving onboarding:', error);
      return null;
    }
  }
};

// Database types (оставляем для совместимости)
export interface User {
  id: string
  telegram_id?: string
  telegram_username?: string
  first_name?: string
  last_name?: string
  subscription_tier: 'basic' | 'advanced' | 'premium'
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  height?: number
  weight?: number
  age?: number
  gender?: 'male' | 'female'
  health_goals?: string[]
  program_type?: string
  created_at: string
  updated_at: string
}

export interface DailyProgress {
  id: string
  user_id: string
  date: string
  weight?: number
  calories_consumed?: number
  calories_target?: number
  steps?: number
  steps_target?: number
  water_intake?: number
  water_target?: number
  completed_tasks?: string[]
  chest_measurement?: number
  waist_measurement?: number
  hips_measurement?: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  calories_per_100g?: number
  proteins_per_100g?: number
  fats_per_100g?: number
  carbs_per_100g?: number
  glycemic_index?: number
  allowed_programs?: string[]
  created_at: string
}

export interface ScheduleTask {
  id: string
  user_id: string
  program_type: string
  task_name: string
  completed: boolean
  scheduled_date: string
  created_at: string
}