import { useState } from "react";
import { Settings, Crown, Award, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AchievementCongrats } from "@/components/AchievementCongrats";

export default function Profile() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const achievements = [
    { id: "early-sleep", icon: "🌙", title: "Неделя раннего сна", description: "7 дней ложились спать до 23:00", unlocked: true },
    { id: "no-breakfast", icon: "🌅", title: "2 недели без завтрака", description: "14 дней интервального голодания", unlocked: true },
    { id: "vitamins", icon: "💊", title: "10 дней приема витаминов", description: "Не пропускали витамины 10 дней подряд", unlocked: true },
    { id: "weight-loss", icon: "⚖️", title: "Первые результаты", description: "Потеряли первые 2 кг", unlocked: false },
    { id: "month-program", icon: "📅", title: "Месяц в программе", description: "30 дней следования системе", unlocked: false }
  ];

  const stats = [
    { label: "Дней в программе", value: "23", trend: "+5" },
    { label: "Потеря веса (кг)", value: "4.2", trend: "-1.2" },
    { label: "Выполнено заданий", value: "89%", trend: "+12%" },
    { label: "Средний балл", value: "8.7", trend: "+0.3" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-xl text-white">Н</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-foreground">Никита</h1>
              <p className="text-sm text-primary-foreground/80">Премиум участник</p>
              <div className="flex items-center gap-2 mt-1">
                <Crown size={14} className="text-yellow-400" />
                <span className="text-xs text-primary-foreground/60">Уровень 3</span>
              </div>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-white">
            <Settings size={18} />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Current Plan */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Ваш тариф</h2>
            <div className="flex items-center gap-1">
              <Crown size={16} className="text-yellow-400" />
              <span className="text-sm font-medium text-primary">ПРЕМИУМ</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Действует до</span>
              <span className="text-foreground font-medium">15.02.2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Осталось дней</span>
              <span className="text-primary font-medium">42 дня</span>
            </div>
            <Progress value={73} className="h-2" />
          </div>
          
          <Button className="w-full mt-4">ПРОДЛИТЬ ПОДПИСКУ</Button>
        </Card>

        {/* Statistics */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Статистика</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-background rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-xs ${
                  stat.trend.startsWith('+') ? 'text-primary' : 'text-red-400'
                }`}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Достижения</h2>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                onClick={() => achievement.unlocked && setSelectedAchievement(achievement)}
                className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-all ${
                  achievement.unlocked
                    ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                    : "bg-background border-border opacity-60"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-dark-surface p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Быстрые действия</h2>
          
          <div className="space-y-3">
            {[
              { icon: Calendar, label: "Календарь питания", color: "text-blue-400" },
              { icon: TrendingUp, label: "Отчеты и аналитика", color: "text-green-400" },
              { icon: Settings, label: "Настройки профиля", color: "text-gray-400" }
            ].map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <action.icon size={20} className={action.color} />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Support */}
        <Card className="bg-dark-surface p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Поддержка</h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              📞 Связаться с экспертом
            </Button>
            <Button variant="outline" className="w-full justify-start">
              ❓ Частые вопросы
            </Button>
          </div>
        </Card>
      </div>

      {/* Achievement Congratulations */}
      {selectedAchievement && (
        <AchievementCongrats
          achievement={selectedAchievement}
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
}