import { useState } from "react";
import { Camera, Info, Zap, Lock, Droplets, X, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { todayProgress, getProgressPercentage, updateProgress } = useDailyProgress();
  const [showWaterTracker, setShowWaterTracker] = useState(false);
  const [waterIntake, setWaterIntake] = useState(todayProgress?.water_intake || 0);
  
  const progress = getProgressPercentage();

  const dailyStats = [
    { 
      label: "Вес", 
      value: todayProgress?.weight ? `${todayProgress.weight}/86` : "78/86", 
      unit: "" 
    },
    { 
      label: "Калории", 
      value: `${todayProgress?.calories_consumed || 687}/${todayProgress?.calories_target || 1050}`, 
      unit: "" 
    },
    { 
      label: "Шаги", 
      value: `${todayProgress?.steps || 5000}/${todayProgress?.steps_target || 8000}`, 
      unit: "" 
    },
    { 
      label: "Вода", 
      value: `${todayProgress?.water_intake || 1.8}/${todayProgress?.water_target || 2.5}`, 
      unit: "л" 
    }
  ];

  const workoutImages = [
    { type: "exercise", title: "НАЧАТЬ ЗАРЯДКУ" },
    { type: "breathing", title: "НАЧАТЬ ДЫХАТЬ" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {user?.first_name?.charAt(0) || 'Н'}
              </span>
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">
                Привет {user?.first_name || 'Пользователь'}!
              </p>
              <p className="text-xs text-primary-foreground/60">Сегодня тот самый день!</p>
            </div>
          </div>
          <div className="w-20 h-12 bg-white/10 rounded-lg p-1">
            <img src="/lovable-uploads/8223f716-5900-4510-a634-41de3d13ba8d.png" alt="MisterMO Health" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Main Activity Section */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Бесплатный ключ к твоему успеху</h2>
            {/* Expert Section */}
            <div className="relative h-32 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/25c62eb0-c3f5-4bcb-8477-75fb06b65fe2.png" 
                  alt="Мистер Мо" 
                  className="w-full h-full object-cover object-center opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 z-10">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-primary leading-tight">
                    Генетическая система<br />здоровья Морачковского
                  </h3>
                  <p className="text-xs text-white/80">Темы / Меню / Чеклисты</p>
                  <Button size="sm" className="bg-primary text-black font-semibold hover:bg-primary/90 w-fit text-xs px-3 py-1" onClick={() => navigate('/themes')}>НАЧАТЬ ИЗУЧЕНИЕ</Button>
                </div>
              </div>
            </div>

            {/* Four Mini Blocks Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Block 1: All Tasks */}
              <div className="relative h-32 overflow-hidden rounded-lg bg-dark-surface p-2">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Расписание дня
                    </h3>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground">Выполнено заданий</span>
                          <span className="text-xs font-medium text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground">Вес</span>
                          <span className="text-xs font-medium">
                            <span className="text-primary font-bold">78</span>
                            <span className="text-muted-foreground">/96</span>
                          </span>
                        </div>
                        <Progress value={78/96 * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Button 
                      size="sm" 
                      className="w-full text-[9px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                      onClick={() => navigate('/schedule')}
                    >
                      ВСЕ ЗАДАНИЯ
                    </Button>
                  </div>
                </div>
              </div>

              {/* Block 2: Start Workout */}
              <div className="relative h-32 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/1dc79c40-a57d-47ca-9b05-2413071ae64a.png" 
                    alt="Мистер Мо - Начать зарядку" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 z-10">
                  <Button 
                    size="sm" 
                    className="w-full text-[9px] bg-primary text-black font-semibold hover:bg-primary/90 h-7"
                    onClick={() => navigate('/workout')}
                  >
                    НАЧАТЬ ТРЕНИРОВКУ
                  </Button>
                </div>
              </div>

              {/* Block 3: Water Tracker */}
              <div className="relative h-32 overflow-hidden rounded-lg bg-dark-surface p-2">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      Трекер воды
                    </h3>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary mb-1">
                        {(todayProgress?.water_intake || 1.8).toFixed(1)} л
                      </div>
                      <div className="text-xs text-muted-foreground">
                        из {todayProgress?.water_target || 2.5} л
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button 
                      size="sm" 
                      className="w-full text-[9px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                      onClick={() => setShowWaterTracker(true)}
                    >
                      ТРЕКЕР ВОДЫ
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Block 4: Start Breathing */}
              <div className="relative h-32 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/2e56f34d-7fa2-427e-901b-0d2e32f2ac44.png" 
                    alt="Начать дышать"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 z-10">
                  <Button 
                    size="sm" 
                    className="w-full text-[9px] bg-primary text-black font-semibold hover:bg-primary/90 h-7"
                    onClick={() => navigate('/breathing')}
                  >
                    НАЧАТЬ ДЫШАТЬ
                  </Button>
                </div>
              </div>
            </div>
          </Card>

        {/* Weight Section */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Вес</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/scanner')}
              className="text-xs"
            >
              <Camera size={12} className="mr-1" />
              Сканировать
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Текущий вес */}
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {todayProgress?.weight || '--'} кг
              </div>
              <p className="text-xs text-muted-foreground">Текущий вес</p>
            </div>
            
            {/* Стартовый вес */}
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {startWeight || '--'} кг
              </div>
              <p className="text-xs text-muted-foreground">Стартовый вес</p>
            </div>
          </div>
          
          {/* Индикатор прогресса */}
          {startWeight && todayProgress?.weight && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Изменение веса</span>
                <span className={todayProgress.weight < startWeight ? 'text-green-500' : 'text-red-500'}>
                  {todayProgress.weight > startWeight ? '+' : ''}{(todayProgress.weight - startWeight).toFixed(1)} кг
                </span>
              </div>
              <Progress 
                value={Math.abs((todayProgress.weight - startWeight) / startWeight * 100)} 
                className="h-2" 
              />
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUpdateProgress('weight', (todayProgress?.weight || 0) - 0.1)}
              disabled={updating === 'weight'}
              className="flex-1"
            >
              <Minus size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUpdateProgress('weight', (todayProgress?.weight || 0) + 0.1)}
              disabled={updating === 'weight'}
              className="flex-1"
            >
              <Plus size={16} />
            </Button>
          </div>
        </Card>

        {/* Daily Stats - Only show for advanced and premium users */}
        {user?.subscription_tier !== 'basic' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Вес</h4>
              <p className="text-lg font-bold text-primary">78/86</p>
            </div>
            <div className="space-y-2">
              {dailyStats.slice(1).map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <span className="text-xs font-medium text-foreground">{stat.value}{stat.unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Feature - Fitness and Facefitness for Premium users */}
        {user?.subscription_tier === 'premium' && (
          <Card className="bg-dark-surface p-4 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
              <img 
                src="/lovable-uploads/94577d3d-a8f3-4e5d-b4e0-63445a47051f.png" 
                alt="Fitness decoration" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-2">Справочник</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Разрешенный<br />или запрещенный<br />КБЖУ
              </p>
              <Button size="sm" className="bg-primary text-black font-semibold hover:bg-primary/90 w-full">
                Фитнес и фейсбилдинг
              </Button>
            </div>
          </Card>
        )}

        {/* Camera Scanner - Only show for advanced and premium users */}
        {user?.subscription_tier !== 'basic' && (
          <Card className="bg-dark-surface p-6 text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Camera size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Сканер еды</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Наведите камеру на продукт для определения калорий и КБЖУ
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="flex flex-col gap-2 h-auto py-4">
                <Camera size={20} />
                <span className="text-xs">Сканировать</span>
              </Button>
              <Button variant="outline" className="flex flex-col gap-2 h-auto py-4">
                <span className="text-xs">Загрузить фото</span>
              </Button>
            </div>
          </Card>
        )}


        {/* Treatment and Prevention - Лечение и Профилактика */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Лечение и Профилактика
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/68331990-8a00-47ce-9ce6-a7b7263f99a2.png" 
                  alt="Диабет"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/diabetes')}
                >
                  ДИАБЕТ
                </Button>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/d7360d5e-cd33-4d46-b260-0608445a7f43.png" 
                  alt="Щитовидка"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/thyroid')}
                >
                  ЩИТОВИДКА
                </Button>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/72380e98-7897-41c1-bd5a-a5572de46d58.png" 
                  alt="Гепатоз"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/hepatosis')}
                >
                  ГЕПАТОЗ
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Education Block - ОБУЧЕНИЕ */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            ОБУЧЕНИЕ: Генетическая система здоровья, Нутропатия, Нутрициология
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-32 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/8080f454-58b8-4bd5-9953-e3a3970b13c9.png" 
                  alt="Стань частью команды"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute top-2 left-2 right-2 z-10">
                <h4 className="text-sm font-bold text-white drop-shadow-lg">
                  Стань частью команды
                </h4>
              </div>
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-xs bg-primary text-black font-semibold hover:bg-primary/90 h-8"
                  onClick={() => window.location.href = '/education'}
                >
                  ОБУЧЕНИЕ
                </Button>
              </div>
            </div>
            <div className="relative h-32 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/4ab86e97-de0b-4cf9-b277-530c2ce3b58d.png" 
                  alt="Повышение квалификации для врачей"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute top-2 left-2 right-2 z-10">
                <h4 className="text-sm font-bold text-white drop-shadow-lg">
                  Повышение квалификации для врачей
                </h4>
              </div>
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-xs bg-primary text-black font-semibold hover:bg-primary/90 h-8"
                  onClick={() => window.location.href = '/education'}
                >
                  ОБУЧЕНИЕ
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Club Membership - Only show for basic users */}
        {user?.subscription_tier === 'basic' && (
          <Card className="bg-dark-surface p-4 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Станьте частью клуба MisterMo
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="relative h-24 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/01943daa-db09-4dcb-a70c-9df8145da00e.png" 
                    alt="Сканер еды"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 z-10">
                  <Button 
                    size="sm" 
                    className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                    onClick={() => navigate('/scanner')}
                  >
                    Сканер еды
                  </Button>
                </div>
              </div>
              <div className="relative h-24 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/90313f9c-2509-4cfa-a9b3-60432ef88b82.png" 
                    alt="Группа поддержки"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 z-10">
                  <Button 
                    size="sm" 
                    className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                    onClick={() => navigate('/chat')}
                  >
                    Группа поддержки
                  </Button>
                </div>
              </div>
              <div className="relative h-24 overflow-hidden rounded-lg">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/26f342d5-a3af-463a-9172-28bd4aafec13.png" 
                    alt="Фитнес и фейсбилдинг"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1 z-10">
                  <Button 
                    size="sm" 
                    className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                    onClick={() => navigate('/workout')}
                  >
                    Фитнес и фейсбилдинг
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Promotional Banners */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { 
              image: "/lovable-uploads/3ed08160-a7d6-4c20-aeff-08d37d165383.png", 
              alt: "Покупай БАДы" 
            },
            { 
              image: "/lovable-uploads/09808562-c223-4ec3-9bcc-33513d2e26ad.png", 
              alt: "MisterMo Genetics" 
            },
            { 
              image: "/lovable-uploads/bbc06265-882a-4522-975e-ba126f0e8716.png", 
              alt: "Доставка питания" 
            }
          ].map((banner, index) => (
            <div key={index} className="cursor-pointer">
              <img 
                src={banner.image} 
                alt={banner.alt}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Water Tracker Modal */}
      <Dialog open={showWaterTracker} onOpenChange={setShowWaterTracker}>
        <DialogContent className="bg-dark-surface border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Droplets className="text-primary" size={20} />
              Трекер воды
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {waterIntake.toFixed(1)} л
              </div>
              <div className="text-sm text-muted-foreground">
                из {todayProgress?.water_target || 2.5} л
              </div>
              <Progress 
                value={(waterIntake / (todayProgress?.water_target || 2.5)) * 100} 
                className="h-3 mt-2" 
              />
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWaterIntake(Math.max(0, waterIntake - 0.25))}
                className="w-12 h-12 rounded-full"
              >
                <Minus size={16} />
              </Button>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">0.25 л</div>
                <div className="text-xs text-muted-foreground">стакан</div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWaterIntake(waterIntake + 0.25)}
                className="w-12 h-12 rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[0.25, 0.5, 1.0].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setWaterIntake(waterIntake + amount)}
                  className="text-xs"
                >
                  +{amount} л
                </Button>
              ))}
            </div>

            <Button 
              className="w-full bg-primary text-black font-semibold hover:bg-primary/90"
              onClick={() => {
                updateProgress({ water_intake: waterIntake });
                setShowWaterTracker(false);
              }}
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}