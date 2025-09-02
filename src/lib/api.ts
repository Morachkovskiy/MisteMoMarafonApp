// API для работы с нашим сервером
const API_BASE_URL = 'https://morachkovskiyapp.com/api';

// Типы данных
export interface User {
  id: string;
  telegram_id?: string;
  telegram_username?: string;
  first_name?: string;
  last_name?: string;
  subscription_tier: 'basic' | 'advanced' | 'premium';
  created_at: string;
  updated_at: string;
}

export interface DailyProgress {
  id: string;
  user_id: string;
  date: string;
  weight?: number | null;
  calories_consumed?: number;
  calories_target?: number;
  steps?: number;
  steps_target?: number;
  water_intake?: number;
  water_target?: number;
  completed_tasks?: string[];
  chest_measurement?: number;
  waist_measurement?: number;
  hips_measurement?: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: 'male' | 'female';
  health_goals?: string[];
  program_type?: string;
  created_at: string;
  updated_at: string;
}

// API функции
export const api = {
  // Авторизация через Telegram
  async authWithTelegram(initData: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ init_data: initData })
      });
      
      if (!response.ok) throw new Error('Auth failed');
      return await response.json();
    } catch (error) {
      console.error('Telegram auth error:', error);
      throw error;
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
  async updateProgress(userId: string, data: Partial<DailyProgress>) {
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
  },

  // Обновить состояние пользователя
  async updateUserState(userId: string, data: { onboarding_done?: boolean; subscription_tier?: string }) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ...data })
      });
      
      if (!response.ok) throw new Error('Failed to update user state');
      return await response.json();
    } catch (error) {
      console.error('Error updating user state:', error);
      return null;
    }
  },

  // Получить стартовый вес пользователя
  async getStartWeight(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/start-weight?user_id=${encodeURIComponent(userId)}`);
      if (!response.ok) throw new Error('Failed to fetch start weight');
      const data = await response.json();
      return data.start_weight || null;
    } catch (error) {
      console.error('Error fetching start weight:', error);
      return null;
    }
  },

  // Сохранить стартовый вес пользователя
  async saveStartWeight(userId: string, weight: number) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/start-weight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, start_weight: weight })
      });
      
      if (!response.ok) throw new Error('Failed to save start weight');
      return await response.json();
    } catch (error) {
      console.error('Error saving start weight:', error);
      return null;
    }
  }
};
