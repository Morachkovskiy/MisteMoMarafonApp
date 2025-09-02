import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './useAuth';
import type { DailyProgress } from '@/lib/api';

export function useDailyProgress() {
  const { user } = useAuth();
  const [todayProgress, setTodayProgress] = useState<DailyProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [startWeight, setStartWeight] = useState<number | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (user?.id) {
      loadTodayProgress();
      loadStartWeight();
    }
  }, [user?.id]);

  // Загружаем стартовый вес пользователя
  const loadStartWeight = async () => {
    if (!user?.id) return;
    
    try {
      // Получаем стартовый вес из профиля или первой записи
      const startWeightData = await api.getStartWeight(user.id);
      if (startWeightData) {
        setStartWeight(startWeightData);
      }
    } catch (error) {
      console.error('Error loading start weight:', error);
    }
  };

  const loadTodayProgress = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const progress = await api.getDailyProgress(user.id, today);
      if (progress) {
        // Проверяем, нужно ли обнулить вес (утром)
        const currentHour = new Date().getHours();
        const shouldResetWeight = currentHour < 12; // До 12:00 обнуляем вес
        
        if (shouldResetWeight && progress.weight !== null) {
          // Обнуляем вес утром
          const updatedProgress = { ...progress, weight: null };
          await api.updateProgress(user.id, { weight: null });
          setTodayProgress(updatedProgress);
        } else {
          setTodayProgress(progress);
        }
      } else {
        // Устанавливаем дефолтные значения при ошибке
        setTodayProgress({
          id: `${user.id}_${today}`,
          user_id: user.id,
          date: today,
          weight: null, // Утром вес всегда null
          calories_consumed: 0,
          calories_target: 1050,
          steps: 0,
          steps_target: 8000,
          water_intake: 0,
          water_target: 2.5,
          completed_tasks: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading daily progress:', error);
      // Устанавливаем дефолтные значения при ошибке
      setTodayProgress({
        id: `${user.id}_${today}`,
        user_id: user.id,
        date: today,
        weight: null, // Утром вес всегда null
        calories_consumed: 0,
        calories_target: 1050,
        steps: 0,
        steps_target: 8000,
        water_intake: 0,
        water_target: 2.5,
        completed_tasks: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<DailyProgress>) => {
    if (!user?.id) return;

    try {
      // Если обновляется вес и это первое заполнение
      if (updates.weight && !startWeight) {
        // Сохраняем как стартовый вес
        await api.saveStartWeight(user.id, updates.weight);
        setStartWeight(updates.weight);
      }

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

  const toggleTask = async (taskId: string) => {
    if (!todayProgress) return;

    const currentTasks = todayProgress.completed_tasks || [];
    const isCompleted = currentTasks.includes(taskId);
    
    const updatedTasks = isCompleted
      ? currentTasks.filter(id => id !== taskId)
      : [...currentTasks, taskId];

    await updateProgress({ completed_tasks: updatedTasks });
  };

  const refresh = () => {
    loadTodayProgress();
  };

  return {
    todayProgress,
    loading,
    updateProgress,
    getProgressPercentage,
    toggleTask,
    refresh,
    startWeight
  };
}