import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Workout() {
  const navigate = useNavigate();
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  const workoutVideos = [
    {
      id: 1,
      title: 'Утренняя разминка',
      description: 'Комплекс упражнений для бодрого начала дня',
      duration: '5 минут',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Базовые упражнения',
      description: 'Основные упражнения для поддержания формы',
      duration: '10 минут',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Растяжка',
      description: 'Упражнения для гибкости и расслабления',
      duration: '7 минут',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Кардио тренировка',
      description: 'Интенсивная тренировка для сердца',
      duration: '15 минут',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

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
            <h1 className="text-xl font-bold text-white">Начать зарядку</h1>
            <p className="text-sm text-white/80">Комплексы упражнений</p>
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

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img 
            src="/lovable-uploads/1dc79c40-a57d-47ca-9b05-2413071ae64a.png" 
            alt="Женщина выполняет упражнения дома"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-semibold">Начните свой день с зарядки</h2>
            <p className="text-sm opacity-90">Энергия и бодрость на весь день</p>
          </div>
        </div>

        {/* Description */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Система Морачковского - Комплекс упражнений который помогает бороться с артериальным давлением, улучшает лимфооток, и запускает нейромышечные связи
          </h2>
          <p className="text-sm text-muted-foreground">
            Специально разработанные комплексы упражнений для поддержания здоровья 
            и формы в рамках генетической системы Морачковского. Все упражнения 
            адаптированы под принципы здорового образа жизни.
          </p>
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="text-xs text-primary">
              💡 Рекомендуется выполнять упражнения утром после контрастного душа 
              и перед приемом добавок
            </p>
          </div>
        </Card>

        {/* ZMA Information */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Важно! ZMA Минералы</h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Для максимальной эффективности тренировок принимайте ZMA минералы:
            </p>
            <div className="bg-primary/10 p-3 rounded-lg space-y-2">
              <p className="text-sm text-primary font-medium">⏰ Время приема:</p>
              <p className="text-sm text-foreground">• В 9:00 утра (натощак)</p>
              <p className="text-sm text-foreground">• В 21:00 вечера (натощак)</p>
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ Обязательно принимать без еды!
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setSelectedInfo('zma-details')}
              className="w-full"
            >
              <Info className="w-4 h-4 mr-2" />
              Узнать подробнее о ZMA
            </Button>
          </div>
        </Card>

        {/* Video List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Видео упражнения</h3>
          
          {workoutVideos.map((video) => (
            <Card key={video.id} className="bg-dark-surface p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{video.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                  <p className="text-xs text-primary mt-2">⏱️ {video.duration}</p>
                </div>
                <Button size="sm" className="ml-3">
                  <Play size={16} className="mr-1" />
                  Смотреть
                </Button>
              </div>
              
              {/* Video iframe */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={video.youtubeUrl}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          ))}
        </div>


        {/* Tips */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Рекомендации</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Выполняйте упражнения на голодный желудок</p>
            <p>• Обязательно разогрейтесь перед тренировкой</p>
            <p>• Следите за дыханием во время упражнений</p>
            <p>• После тренировки выпейте стакан воды</p>
            <p>• Не забывайте отмечать выполнение в расписании дня</p>
          </div>
        </Card>
      </div>

      {/* Info Dialog */}
      <Dialog open={selectedInfo !== null} onOpenChange={() => setSelectedInfo(null)}>
        <DialogContent className="max-w-lg mx-auto bg-dark-surface border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">ZMA - Важный минеральный комплекс</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm pb-4">
            {/* ZMA Product Image */}
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/e7fccbe8-40ce-49fd-8438-da3e9f88bc44.png" 
                alt="ZMA продукт - Цинк, Магний и Витамин B6"
                className="w-48 h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Что такое ZMA?</h4>
              <p className="text-muted-foreground">
                ZMA - это синергетическая комбинация цинка, магния и витамина B6, 
                специально разработанная для максимального усвоения и эффективности.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Состав:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• <strong>Цинк</strong> - поддержка иммунитета и гормонального баланса</li>
                <li>• <strong>Магний</strong> - здоровье мышц и нервной системы</li>
                <li>• <strong>Витамин B6</strong> - улучшение усвоения цинка и магния</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Правила приема:</h4>
              <div className="bg-primary/10 p-3 rounded-lg space-y-2">
                <p className="text-primary font-medium">⏰ Время: 9:00 или 21:00</p>
                <p className="text-foreground">🍽️ Строго натощак (за 2 часа до или после еды)</p>
                <p className="text-foreground">💊 Дозировка: 3 капсулы</p>
                <p className="text-foreground">💧 Запивать большим количеством воды</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Почему именно натощак?</h4>
              <p className="text-muted-foreground">
                Кальций из пищи может блокировать усвоение цинка и магния. 
                Прием натощак обеспечивает максимальную биодоступность минералов.
              </p>
            </div>

            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <p className="text-xs text-yellow-600">
                ⚠️ Важно: Не принимать вместе с кальцием, железом или кофеином
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}