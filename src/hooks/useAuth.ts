import { useState, useEffect } from 'react';
import type { User } from '@/lib/api';
import { api } from '@/lib/api';
import { initTelegramWebApp } from '@/lib/telegram';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  useEffect(() => {
    // Инициализируем Telegram Web App
    initTelegramWebApp();
    
    // Пытаемся авторизоваться
    const tryAuth = async () => {
      try {
        // Проверяем, есть ли initData от Telegram
        const initData = (window as any)?.Telegram?.WebApp?.initData;
        
        if (initData && initData.length > 0) {
          // Авторизуемся через Telegram
          await signInWithTelegram(initData);
        } else {
          // Проверяем сохраненного пользователя
          const storedUser = localStorage.getItem('telegram_user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setOnboardingDone(localStorage.getItem('onboarding_done') === 'true');
            setSubscriptionTier(localStorage.getItem('subscription_tier'));
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    tryAuth();
  }, []);

  const signInWithTelegram = async (initData: string) => {
    try {
      // Авторизуемся через наш API
      const authResult = await api.authWithTelegram(initData);
      const apiUser = authResult.user;

      // Создаем объект пользователя
      const userObj: User = {
        id: apiUser.id,
        telegram_id: apiUser.telegram_id,
        telegram_username: apiUser.username,
        first_name: apiUser.first_name,
        last_name: apiUser.last_name,
        subscription_tier: apiUser.subscription_tier || 'basic',
        created_at: apiUser.created_at || new Date().toISOString(),
        updated_at: apiUser.updated_at || new Date().toISOString()
      };

      // Сохраняем пользователя
      setUser(userObj);
      localStorage.setItem('telegram_user', JSON.stringify(userObj));

      // Получаем состояние пользователя с сервера
      const userState = await api.getUserState(apiUser.id);
      
      if (userState.onboarding_done) {
        setOnboardingDone(true);
        localStorage.setItem('onboarding_done', 'true');
      } else {
        setOnboardingDone(false);
        localStorage.setItem('onboarding_done', 'false');
      }

      if (userState.subscription_tier) {
        setSubscriptionTier(userState.subscription_tier);
        localStorage.setItem('subscription_tier', userState.subscription_tier);
      }

      return userObj;
    } catch (error) {
      console.error('Telegram auth error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setOnboardingDone(false);
    setSubscriptionTier(null);
    localStorage.removeItem('telegram_user');
    localStorage.removeItem('onboarding_done');
    localStorage.removeItem('subscription_tier');
  };

  const updateSubscriptionTier = async (tier: 'basic' | 'advanced' | 'premium') => {
    if (!user) return;

    try {
      await api.updateUserState(user.id, { subscription_tier: tier });
      
      const updatedUser = { ...user, subscription_tier: tier };
      setUser(updatedUser);
      setSubscriptionTier(tier);
      
      localStorage.setItem('telegram_user', JSON.stringify(updatedUser));
      localStorage.setItem('subscription_tier', tier);
    } catch (error) {
      console.error('Error updating subscription tier:', error);
    }
  };

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      await api.updateUserState(user.id, { onboarding_done: true });
      setOnboardingDone(true);
      localStorage.setItem('onboarding_done', 'true');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return {
    user,
    loading,
    onboardingDone,
    subscriptionTier,
    signInWithTelegram,
    signOut,
    updateSubscriptionTier,
    completeOnboarding
  };
}