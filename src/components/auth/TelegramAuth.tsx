import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import '@/types/telegram'

export function TelegramAuth() {
  const { signInWithTelegram, loading } = useAuth()
  const { toast } = useToast()
  const [isAttempting, setIsAttempting] = useState(false)

  useEffect(() => {
    // Initialize Telegram Web App
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready?.()
      window.Telegram.WebApp.expand?.()

      // Auto-login if Telegram user data is available
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user
      if (telegramUser) {
        handleTelegramLogin(telegramUser)
      }
    }
  }, [])

  const handleTelegramLogin = async (telegramUser: any) => {
    setIsAttempting(true)
    try {
      console.log('Attempting login with:', telegramUser)
      await signInWithTelegram(telegramUser)
      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${telegramUser.first_name}!`,
      })
    } catch (error) {
      console.error('Telegram login failed:', error)
      toast({
        title: "Ошибка входа",
        description: "Проблема с подключением к базе данных. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsAttempting(false)
    }
  }

  const handleManualLogin = () => {
    // For testing purposes - simulate telegram user
    const mockTelegramUser = {
      id: 123456789,
      first_name: 'Никита',
      username: 'nikita_test'
    }
    handleTelegramLogin(mockTelegramUser)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 text-center">
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <img src="/lovable-uploads/f013bf5a-7942-4ed0-aaac-dbe0ac8b7022.png" alt="MisterMO Health" className="w-full h-full object-cover" />
          </div>
          <p className="text-muted-foreground">
            Генетическая система здоровья Морачковского
          </p>
        </div>


        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Войдите в систему для доступа к персональным программам оздоровления
          </p>

          <Button 
            onClick={handleManualLogin}
            disabled={loading || isAttempting}
            className="w-full"
          >
            {loading || isAttempting ? 'Выполняется вход...' : 'Войти через Telegram'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>✓ Безопасная авторизация</p>
          <p>✓ Персональные программы</p>
          <p>✓ Круглосуточная поддержка</p>
        </div>
      </Card>
    </div>
  )
}