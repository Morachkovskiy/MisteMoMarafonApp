import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Breathing() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timer, setTimer] = useState(3);
  const [cycle, setCycle] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0); // 0=3sec, 1=4sec, 2=5sec
  const [levelProgress, setLevelProgress] = useState(0); // seconds in current level
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const levels = [
    { duration: 3, name: "Начинающий", time: "5 мин" },
    { duration: 4, name: "Средний", time: "5 мин" },
    { duration: 5, name: "Продвинутый", time: "5 мин" }
  ];

  const phases = {
    inhale: { label: 'Вдох', color: 'from-blue-500/20 to-cyan-500/20' },
    hold1: { label: 'Задержка', color: 'from-purple-500/20 to-indigo-500/20' },
    exhale: { label: 'Выдох', color: 'from-green-500/20 to-emerald-500/20' },
    hold2: { label: 'Пауза', color: 'from-yellow-500/20 to-orange-500/20' }
  };

  const playBeep = (frequency: number = 800, duration: number = 200) => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio not available');
    }
  };

  const nextPhase = () => {
    const phaseOrder: Array<keyof typeof phases> = ['inhale', 'hold1', 'exhale', 'hold2'];
    const currentIndex = phaseOrder.indexOf(phase);
    const nextIndex = (currentIndex + 1) % phaseOrder.length;
    const nextPhase = phaseOrder[nextIndex];
    const currentDuration = levels[currentLevel].duration;
    
    setPhase(nextPhase);
    setTimer(currentDuration);
    
    // Play different sounds for different phases
    if (nextPhase === 'inhale') {
      playBeep(600, 300);
      setCycle(prev => prev + 1);
    } else if (nextPhase === 'exhale') {
      playBeep(400, 300);
    } else {
      playBeep(500, 150);
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            nextPhase();
            return levels[currentLevel].duration;
          }
          // Play heartbeat during hold phases  
          if ((phase === 'hold1' || phase === 'hold2') && prev > 1) {
            playBeep(200, 100);
          }
          return prev - 1;
        });
        
        // Track progress for level switching (5 minutes = 300 seconds per level)
        setLevelProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 300 && currentLevel < 2) {
            setCurrentLevel(prevLevel => prevLevel + 1);
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, phase, currentLevel]);

  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(levels[currentLevel].duration);
    setCycle(0);
    setLevelProgress(0);
    playBeep(600, 300);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(levels[currentLevel].duration);
    setCurrentLevel(0);
    setLevelProgress(0);
  };

  const getSquareSize = () => {
    const progress = (levels[currentLevel].duration - timer) / levels[currentLevel].duration;
    const baseSize = 120;
    const maxSize = 180;
    
    if (phase === 'inhale') {
      return baseSize + (maxSize - baseSize) * progress;
    } else if (phase === 'exhale') {
      return maxSize - (maxSize - baseSize) * progress;
    }
    return phase === 'hold1' ? maxSize : baseSize;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Начать дышать</h1>
            <p className="text-sm text-white/80">Квадратное дыхание</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Club Membership - Станьте частью клуба MisterMo */}
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

        {/* Level Progress */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">
              Уровень: {levels[currentLevel].name}
            </h2>
            <span className="text-sm text-muted-foreground">
              {levels[currentLevel].duration} сек / фаза
            </span>
          </div>
          <div className="flex gap-2">
            {levels.map((level, index) => (
              <div 
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index < currentLevel ? 'bg-primary' : 
                  index === currentLevel ? 'bg-primary/50' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Прогресс уровня: {Math.floor(levelProgress / 60)}:{(levelProgress % 60).toString().padStart(2, '0')} / 5:00
          </p>
        </Card>

        {/* Description */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            Дыхательная медитация
          </h3>
          <p className="text-sm text-muted-foreground">
            Прогрессивная техника дыхания с тремя уровнями сложности. 
            Каждый уровень длится 5 минут и автоматически переходит к следующему.
          </p>
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="text-xs text-primary">
              🧘‍♀️ Следуйте за квадратом и звуковыми сигналами для глубокой медитации
            </p>
          </div>
        </Card>

        {/* Breathing Square */}
        <Card className="bg-dark-surface p-8 flex flex-col items-center space-y-6">
          <div className="relative flex items-center justify-center h-64 w-full">
            <div 
              className={`
                transition-all duration-1000 ease-in-out rounded-lg border-4 border-primary/50
                bg-gradient-to-br ${phases[phase].color}
                flex items-center justify-center
              `}
              style={{
                width: `${getSquareSize()}px`,
                height: `${getSquareSize()}px`,
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{timer}</div>
                <div className="text-sm font-medium text-foreground">{phases[phase].label}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={isActive ? stopBreathing : startBreathing}
              size="lg"
              className="bg-primary text-black font-semibold hover:bg-primary/90"
            >
              {isActive ? <Pause size={20} /> : <Play size={20} />}
              <span className="ml-2">{isActive ? 'Остановить' : 'Начать'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
          </div>

          {cycle > 0 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Циклов завершено: {cycle}</p>
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Как выполнять</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <p className="font-medium text-blue-400">Вдох ({levels[currentLevel].duration} сек)</p>
                <p className="text-sm text-muted-foreground">Медленно вдыхайте через нос</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
              <div>
                <p className="font-medium text-purple-400">Задержка ({levels[currentLevel].duration} сек)</p>
                <p className="text-sm text-muted-foreground">Держите дыхание</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="font-medium text-green-400">Выдох ({levels[currentLevel].duration} сек)</p>
                <p className="text-sm text-muted-foreground">Медленно выдыхайте через рот</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <div>
                <p className="font-medium text-yellow-400">Пауза ({levels[currentLevel].duration} сек)</p>
                <p className="text-sm text-muted-foreground">Держите паузу перед следующим вдохом</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Польза дыхательной гимнастики</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Снижает уровень стресса и тревожности</p>
            <p>• Улучшает концентрацию и внимание</p>
            <p>• Нормализует артериальное давление</p>
            <p>• Помогает при бессоннице</p>
            <p>• Активизирует парасимпатическую нервную систему</p>
            <p>• Улучшает общее самочувствие</p>
          </div>
        </Card>
      </div>
    </div>
  );
}