import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramAuth } from '@/components/auth/TelegramAuth';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Вход</CardTitle>
          <CardDescription>
            Введите ваш email и пароль, чтобы войти
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TelegramAuth />
          <div className="mt-4 text-center text-sm">
            Нет аккаунта?{" "}
            <Link to="/register" className="underline">
              Зарегистрироваться
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}