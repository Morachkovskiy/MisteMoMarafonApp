import type { TelegramUser } from '@/types/telegram'

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    return window.Telegram.WebApp;
  }
  return null;
};

export const getTelegramUser = (): TelegramUser | null => {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

export const closeTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};