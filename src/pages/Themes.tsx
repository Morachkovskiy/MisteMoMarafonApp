import { useAuth } from '@/hooks/useAuth'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Play, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LiteratureViewer } from '@/components/ui/literature-viewer'

interface VideoItem {
  id: string
  title: string
  description: string
  youtubeId: string
  isLocked: boolean
  requiredTier: 'basic' | 'advanced' | 'premium'
}

interface DownloadItem {
  id: string
  title: string
  description: string
  fileUrl: string
  isLocked: boolean
  requiredTier: 'basic' | 'advanced' | 'premium'
}

export default function Themes() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const videos: VideoItem[] = [
    {
      id: '1',
      title: 'Основы генетического здоровья',
      description: 'Введение в систему Морачковского. Понимание базовых принципов.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: false,
      requiredTier: 'basic'
    },
    {
      id: '2',
      title: 'Правильное питание по генотипу',
      description: 'Как составить персональный рацион на основе генетических данных.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier === 'basic',
      requiredTier: 'advanced'
    },
    {
      id: '3',
      title: 'Метаболизм и гормоны',
      description: 'Регуляция обмена веществ через питание и образ жизни.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier === 'basic',
      requiredTier: 'advanced'
    },
    {
      id: '4',
      title: 'Детоксикация организма',
      description: 'Естественные методы очищения организма от токсинов.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier === 'basic',
      requiredTier: 'advanced'
    },
    {
      id: '5',
      title: 'Спорт и генетика',
      description: 'Подбор физических нагрузок на основе генетических особенностей.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier !== 'premium',
      requiredTier: 'premium'
    },
    {
      id: '6',
      title: 'Сон и восстановление',
      description: 'Оптимизация сна для максимального восстановления организма.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier !== 'premium',
      requiredTier: 'premium'
    },
    {
      id: '7',
      title: 'Стресс и психосоматика',
      description: 'Управление стрессом через понимание генетических предрасположенностей.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier !== 'premium',
      requiredTier: 'premium'
    },
    {
      id: '8',
      title: 'Долголетие и антиэйджинг',
      description: 'Генетические факторы старения и методы их коррекции.',
      youtubeId: 'ZU2yWlpmjNA',
      isLocked: user?.subscription_tier !== 'premium',
      requiredTier: 'premium'
    }
  ]

  const downloads: DownloadItem[] = [
    {
      id: '1',
      title: 'Чек-лист базовых принципов',
      description: 'PDF руководство с основными принципами здорового питания',
      fileUrl: '#',
      isLocked: false,
      requiredTier: 'basic'
    },
    {
      id: '2',
      title: 'Таблица продуктов по ГИ',
      description: 'Подробная таблица гликемических индексов продуктов',
      fileUrl: '#',
      isLocked: user?.subscription_tier === 'basic',
      requiredTier: 'advanced'
    },
    {
      id: '3',
      title: 'Рецепты здорового питания',
      description: 'Сборник из 50 рецептов для здорового образа жизни',
      fileUrl: '#',
      isLocked: user?.subscription_tier === 'basic',
      requiredTier: 'advanced'
    },
    {
      id: '4',
      title: 'Персональный план детокса',
      description: 'Индивидуальная программа детоксикации на 30 дней',
      fileUrl: '#',
      isLocked: user?.subscription_tier !== 'premium',
      requiredTier: 'premium'
    }
  ]

  const handleUpgrade = () => {
    navigate('/shop')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-white/10 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">
            Генетическая система Морачковского
          </h1>
        </div>
        <p className="text-primary-foreground/80 text-sm">
          Темы / Меню / Чеклисты
        </p>
      </div>

      <div className="p-4 space-y-6">
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

        {/* Баннер с Мистером Мо */}
        <Card className="overflow-hidden bg-gradient-to-r from-primary to-primary/80">
          <div className="flex items-center p-6 min-h-[200px]">
            <div className="flex-1 text-primary-foreground">
              <h2 className="text-xl font-bold mb-2">Морачковский Никита</h2>
              <p className="text-primary-foreground/90 text-sm leading-relaxed">
                Ученый-исследователь.<br/>
                Автор книг и методик.<br/>
                Эксперт в области генетики и эндокринологии.<br/>
                Студент Stanford Medicine.<br/>
                Создатель одноименной системы Генетического здоровья.<br/>
                Создатель системы по выходу из голода за один день.
              </p>
            </div>
            <div className="flex flex-col items-center ml-4">
              <div className="w-44 h-full rounded-lg overflow-hidden bg-white/10 mb-3">
                <img 
                  src="/lovable-uploads/6462592d-c9dd-4788-9e48-3497f1bccfdf.png" 
                  alt="Мистер Мо" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src="/lovable-uploads/18820993-37f1-4303-ada6-f3e6af33c1cb.png" alt="Morachkovskiy Academy" className="w-36 h-auto" />
                <img src="/lovable-uploads/94577d3d-a8f3-4e5d-b4e0-63445a47051f.png" alt="Stanford Medicine" className="h-9" />
              </div>
            </div>
          </div>
        </Card>

        {/* Видео секция */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Обучающие видео</h2>
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video, index) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {video.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Literature Section */}
        <LiteratureViewer />

        {/* Файлы для скачивания */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Материалы для скачивания</h2>
          <div className="grid grid-cols-1 gap-3">
            {downloads.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}