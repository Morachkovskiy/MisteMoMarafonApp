import { useState, useEffect } from 'react';
import { api } from '@/lib/supabase';
import { useAuth } from './useAuth';

export function useDailyProgress() {
  const { user } = useAuth();
  const [todayProgress, setTodayProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user?.id) {
      loadTodayProgress();
    }
  }, [user?.id]);

  const loadTodayProgress = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const progress = await api.getDailyProgress(user.id, today);
      setTodayProgress(progress);
    } catch (error) {
      console.error('Error loading daily progress:', error);
      // Устанавливаем дефолтные значения при ошибке
      setTodayProgress({
        weight: null,
        calories_consumed: 0,
        calories_target: 1050,
        steps: 0,
        steps_target: 8000,
        water_intake: 0,
        water_target: 2.5,
        completed_tasks: []
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: any) => {
    if (!user?.id) return;

    try {
      const updatedProgress = await api.updateProgress(user.id, updates);
      if (updatedProgress) {
        setTodayProgress(prev => ({ ...prev, ...updatedProgress }));
      }
      return updatedProgress;
    } catch (error) {
      console.error('Error updating progress:', error);
      return null;
    }
  };

  const getProgressPercentage = () => {
    if (!todayProgress?.completed_tasks) return 0;
    const completedTasks = todayProgress.completed_tasks.length;
    const totalTasks = 10; // Примерное количество задач в день
    return Math.min(Math.round((completedTasks / totalTasks) * 100), 100);
  };

  return {
    todayProgress,
    loading,
    updateProgress,
    getProgressPercentage,
    refresh: loadTodayProgress
  };
}