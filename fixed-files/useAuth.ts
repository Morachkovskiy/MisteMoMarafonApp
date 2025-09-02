import { useState, useEffect } from 'react'
import type { User } from '@/lib/supabase'
import { initTelegramWebApp } from '@/lib/telegram'
import { api } from '@/lib/supabase'

export function useAuth() {
  const [session, setSession] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Telegram Web App
    initTelegramWebApp();

    const tryLogin = async () => {
      try {
        const initData = (window as any)?.Telegram?.WebApp?.initData as string | undefined
        if (initData && initData.length > 0) {
          await signInWithTelegram()
          return
        }
        // Fallback: check stored user
        const storedUser = localStorage.getItem('telegram_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setSession({
            user: { id: userData.id, email: `${userData.telegram_id || userData.id}@telegram.user` }
          })
        }
      } finally {
        setLoading(false)
      }
    }

    void tryLogin()
  }, [])

  const fetchUserProfile = async (_userId: string) => {
    // Profile read is handled during auth; can be extended to call /api/user later
    return
  }

  const signInWithTelegram = async () => {
    try {
      const initData = (window as any)?.Telegram?.WebApp?.initData as string | undefined
      if (!initData || initData.length === 0) {
        throw new Error('Запустите через Telegram, initData отсутствует')
      }

      const res = await fetch('/api/auth/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ init_data: initData })
      })
      if (!res.ok) {
        throw new Error(`Auth failed: ${res.status}`)
      }
      const data = await res.json()
      const apiUser = data.user

      const sessionObj = {
        user: { id: apiUser.id, email: `${apiUser.telegram_id || apiUser.id}@telegram.user` }
      }

      const storedUser: User = {
        id: apiUser.id,
        telegram_id: apiUser.telegram_id,
        telegram_username: apiUser.username,
        first_name: apiUser.first_name,
        last_name: apiUser.last_name,
        subscription_tier: 'basic',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setSession(sessionObj)
      setUser(storedUser)
      localStorage.setItem('telegram_user', JSON.stringify(storedUser))
      localStorage.setItem('auth_token', data.token || '')

      // pull server-side state (onboarding/tier) and mirror to localStorage for routing
      try {
        const userState = await api.getUserState(apiUser.id)
        console.log('Server state:', userState) // Debug log
        
        // Устанавливаем onboarding_done только если сервер явно говорит true
        if (userState.onboarding_done === true) {
          localStorage.setItem('onboarding_done', 'true')
          console.log('User has completed onboarding')
        } else {
          // Если onboarding_done не true или отсутствует, то считаем что анкета не заполнена
          localStorage.setItem('onboarding_done', 'false')
          console.log('User has NOT completed onboarding')
        }
        
        if (userState.subscription_tier) {
          localStorage.setItem('subscription_tier', userState.subscription_tier)
          console.log('User subscription tier:', userState.subscription_tier)
        } else {
          // Если нет тарифа, очищаем
          localStorage.removeItem('subscription_tier')
          console.log('No subscription tier found')
        }
      } catch (error) {
        console.error('Error fetching user state:', error)
        // При ошибке считаем что пользователь новый
        localStorage.setItem('onboarding_done', 'false')
        localStorage.removeItem('subscription_tier')
      }

      return { session: sessionObj, user: storedUser }
    } catch (error) {
      console.error('Error signing in with Telegram:', error)
      throw error
    }
  }

  const createUserProfile = async (_userId: string, _telegramUser: any) => { return }

  const signOut = async () => {
    setSession(null)
    setUser(null)
    localStorage.removeItem('telegram_user')
    localStorage.removeItem('onboarding_done')
    localStorage.removeItem('subscription_tier')
  }

  const updateSubscriptionTier = async (tier: 'basic' | 'advanced' | 'premium') => {
    if (!user) return

    const updatedUser = { ...user, subscription_tier: tier, updated_at: new Date().toISOString() }
    setUser(updatedUser)
    localStorage.setItem('telegram_user', JSON.stringify(updatedUser))
  }

  return {
    session,
    user,
    loading,
    signInWithTelegram,
    signOut,
    updateSubscriptionTier,
  }
}