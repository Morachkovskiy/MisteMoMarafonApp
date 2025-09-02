import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Sun, Clock, Moon, Scale, MessageCircle, ShoppingCart, Instagram, Video, Music, Send } from 'lucide-react';


interface Task {
  id: string;
  title: string;
  hasVideo?: boolean;
  hasAudio?: boolean;
  hasInfo?: boolean;
  videoUrl?: string;
  audioUrl?: string;
  infoContent?: string;
  subtasks?: Array<{
    id: string;
    title: string;
    hasInfo?: boolean;
    infoContent?: string;
  }>;
}

interface TimeBlock {
  id: string;
  title: string;
  timeRange: string;
  icon: any;
  color: string;
  tasks: Task[];
}

const getDayName = () => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[new Date().getDay()];
};

const getMorningTasks = (): Task[] => [
  {
    id: 'wake-up',
    title: 'Утренний подъем до 7 утра'
  },
  {
    id: 'weigh',
    title: 'Взвесится'
  },
  {
    id: 'shower',
    title: 'Контрастный душ',
    hasVideo: true,
    videoUrl: '/videos/contrast-shower.mp4'
  },
  {
    id: 'workout',
    title: 'Разминка 5 минут',
    hasVideo: true,
    videoUrl: '/videos/workout.mp4'
  },
  {
    id: 'supplements-morning',
    title: 'Прием добавок',
    subtasks: [
      {
        id: 'zma',
        title: 'ZMA 3шт',
        hasInfo: true,
        infoContent: 'zma'
      },
      {
        id: 'collagen',
        title: 'COLLAGEN мерная ложка',
        hasInfo: true,
        infoContent: 'collagen'
      },
      {
        id: 'vitamin-c',
        title: 'VITAMIN C 1шт',
        hasInfo: true,
        infoContent: 'vitamin-c'
      }
    ]
  },
  {
    id: 'motivation',
    title: 'Мотивирующее голосовое от меня',
    hasAudio: true,
    audioUrl: '/audio/motivation-morning.mp3'
  },
  {
    id: 'breathing',
    title: 'Дыхательная гимнастика 10-15 минут',
    hasVideo: true,
    videoUrl: '/videos/breathing.mp4'
  },
  {
    id: 'work-time',
    title: 'Время на сборы и работа'
  }
];

const getDayTasks = (isFasting = false): Task[] => [
  {
    id: 'social-share',
    title: 'НЕ ЗАБЫВАЙТЕ ДЕЛИТЬСЯ В СОЦ.СЕТЯХ ВАШИМ ПРОГРЕССОМ. ДЕЛАЙТЕ СКРИНШОТ СВОЕГО ПРОГРЕССА, МОТИВИРУЙТЕ БЛИЗКИХ!!!',
    hasVideo: true,
    videoUrl: '/videos/social-sharing.mp4'
  },
  ...(isFasting ? [
    {
      id: 'lunch-fasting',
      title: 'Во время обеда: представьте, вы супер мен! Вы можете легко не есть 2 дня 🥳'
    },
    {
      id: 'walk-lunch',
      title: '20 минут прогулка',
      hasAudio: true,
      audioUrl: '/audio/walk-motivation.mp3'
    }
  ] : [
    {
      id: 'lunch-prep',
      title: 'Готовимся к обеду. Оцениваем усталость',
      hasVideo: true,
      videoUrl: '/videos/inner-child.mp4'
    },
    {
      id: 'apple-vinegar-lunch',
      title: 'За 15 минут до приёма пищи: Яблочный уксус 1шт',
      hasInfo: true,
      infoContent: 'apple-vinegar'
    },
    {
      id: 'berberin-lunch',
      title: 'За 15 минут до приёма пищи: Berberin 1шт',
      hasInfo: true,
      infoContent: 'berberin'
    },
    {
      id: 'lunch-time',
      title: 'Время приёма пищи',
      hasVideo: true,
      videoUrl: '/videos/plate-setup.mp4',
      subtasks: [
        {
          id: 'omega3-lunch',
          title: 'Омега3 - 4шт',
          hasInfo: true,
          infoContent: 'omega-3'
        },
        {
          id: 'vitamin-d3-lunch',
          title: 'Д3 по схеме',
          hasInfo: true,
          infoContent: 'd3-k2'
        },
        {
          id: 'women-complex-lunch',
          title: 'Женский комплекс 3шт',
          hasInfo: true,
          infoContent: 'women-complex'
        }
      ]
    },
    {
      id: 'mindful-eating-lunch',
      title: 'Осознанно посмотреть на порцию. Оценить её'
    },
    {
      id: 'slow-eating-lunch',
      title: 'Едим не спеша. Не набираем ложку пока не прожевали и не проглотили'
    },
    {
      id: 'walk-after-lunch',
      title: 'После приема пищи, 5 минут прогулка',
      hasAudio: true,
      audioUrl: '/audio/walk-motivation.mp3'
    }
  ]),
  ...(isFasting ? [
    {
      id: 'evening-reflection',
      title: 'Вечером оцениваем усталость по сравнению с днями когда едим'
    },
    {
      id: 'walk-evening-fasting',
      title: '20 минут походить',
      hasAudio: true,
      audioUrl: '/audio/evening-motivation.mp3'
    }
  ] : [
    {
      id: 'dinner-prep',
      title: 'Готовимся к ужину. Оцениваем усталость'
    },
    {
      id: 'apple-vinegar-dinner',
      title: 'За 15 минут до приёма пищи: Яблочный уксус 1шт',
      hasInfo: true,
      infoContent: 'apple-vinegar'
    },
    {
      id: 'berberin-dinner',
      title: 'За 15 минут до приёма пищи: Berberin 1шт',
      hasInfo: true,
      infoContent: 'berberin'
    },
    {
      id: 'dinner-time',
      title: 'Время приёма пищи',
      hasVideo: true,
      videoUrl: '/videos/plate-setup.mp4'
    },
    {
      id: 'mindful-eating-dinner',
      title: 'Осознанно посмотреть на порцию. Оценить её'
    },
    {
      id: 'slow-eating-dinner',
      title: 'Едим не спеша. Не набираем ложку пока не прожевали и не проглотили'
    },
    {
      id: 'walk-after-dinner',
      title: 'После приема пищи, 5 минут походить',
      hasAudio: true,
      audioUrl: '/audio/evening-motivation.mp3'
    }
  ])
];

const getEveningTasks = (): Task[] => [
  {
    id: 'fat-burner',
    title: '21:00 прием Жиросжигателя 2шт',
    hasInfo: true,
    infoContent: 'fat-burner'
  },
  {
    id: 'evening-breathing',
    title: 'Дыхательная гимнастика 10-15 минут',
    hasVideo: true,
    videoUrl: '/videos/breathing.mp4'
  },
  {
    id: 'good-habits',
    title: 'Хорошие привычки перед сном',
    subtasks: [
      {
        id: 'english',
        title: 'Изучение английского 15 минут (memrise приложение)'
      },
      {
        id: 'wikipedia',
        title: 'Википедия - случайная статья'
      },
      {
        id: 'morachkovsky',
        title: 'Посмотреть одну тему Морачковского'
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Отбой не позже 23:00'
  }
];

const getFastingMorningTasks = (): Task[] => [
  {
    id: 'wake-up',
    title: 'Утренний подъем до 7 утра'
  },
  {
    id: 'weigh',
    title: 'Взвесится'
  },
  {
    id: 'shower',
    title: 'Контрастный душ',
    hasVideo: true,
    videoUrl: '/videos/contrast-shower.mp4'
  },
  {
    id: 'workout',
    title: 'Разминка 5 минут',
    hasVideo: true,
    videoUrl: '/videos/workout.mp4'
  },
  {
    id: 'supplements-morning',
    title: 'Прием добавок',
    subtasks: [
      {
        id: 'zma',
        title: 'ZMA 3шт'
      },
      {
        id: 'collagen',
        title: 'COLLAGEN мерная ложка'
      },
      {
        id: 'vitamin-c',
        title: 'VITAMIN C 1шт'
      }
    ]
  },
  {
    id: 'reflection',
    title: 'Подумать о том что это еще один день в вашей жизни, и он вас приближает к смерти, поэтому нужно прожить его полноценно и интересно - 2 минуты'
  },
  {
    id: 'breathing',
    title: 'Дыхательная гимнастика 10-15 минут',
    hasVideo: true,
    videoUrl: '/videos/breathing.mp4'
  },
  {
    id: 'work-time',
    title: 'Время на сборы и работа'
  }
];

export default function Schedule() {
  const { todayProgress, toggleTask, getProgressPercentage, updateProgress } = useDailyProgress();
  const navigate = useNavigate();
  const [isMonday, setIsMonday] = useState(false);
  const [isSunday, setIsSunday] = useState(false);
  const [isFasting, setIsFasting] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);
  const [weightInput, setWeightInput] = useState('');
  const [showWeightDialog, setShowWeightDialog] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: ''
  });

  useEffect(() => {
    const today = new Date().getDay();
    setIsMonday(today === 1);
    setIsSunday(today === 0);
  }, []);

  const getTimeBlocks = (): TimeBlock[] => {
    if (isMonday && isFasting) {
      return [
        {
          id: 'morning',
          title: 'Утреннее время',
          timeRange: 'до 10:00',
          icon: Sun,
          color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
          tasks: getFastingMorningTasks()
        },
        {
          id: 'day',
          title: 'Дневное время',
          timeRange: '10:00 - 21:00',
          icon: Clock,
          color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
          tasks: getDayTasks(true)
        },
        {
          id: 'evening',
          title: 'Вечернее время',
          timeRange: '21:00 - 24:00',
          icon: Moon,
          color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
          tasks: getEveningTasks()
        }
      ];
    }

    return [
      {
        id: 'morning',
        title: 'Утреннее время',
        timeRange: 'до 10:00',
        icon: Sun,
        color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
        tasks: getMorningTasks()
      },
      {
        id: 'day',
        title: 'Дневное время',
        timeRange: '10:00 - 21:00',
        icon: Clock,
        color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
        tasks: getDayTasks(false)
      },
      {
        id: 'evening',
        title: 'Вечернее время',
        timeRange: '21:00 - 24:00',
        icon: Moon,
        color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
        tasks: getEveningTasks()
      }
    ];
  };

  const timeBlocks = getTimeBlocks();
  const completedTasks = todayProgress?.completed_tasks || [];
  const progressPercentage = getProgressPercentage();

  const isTaskCompleted = (taskId: string) => {
    return completedTasks.includes(taskId);
  };

  const handleTaskToggle = (taskId: string) => {
    toggleTask(taskId);
  };

  const saveMeasurements = async () => {
    if (measurements.chest || measurements.waist || measurements.hips) {
      await updateProgress({
        chest_measurement: parseFloat(measurements.chest) || undefined,
        waist_measurement: parseFloat(measurements.waist) || undefined,
        hips_measurement: parseFloat(measurements.hips) || undefined,
      });
    }
  };

  const saveWeight = async () => {
    if (weightInput) {
      try {
        await updateProgress({
          weight: parseFloat(weightInput),
        });
        setWeightInput('');
        setShowWeightDialog(false);
        // Mark task as completed after saving weight
        handleTaskToggle('weigh');
      } catch (error) {
        console.error('Error saving weight:', error);
      }
    }
  };

  const TaskItem = ({ task, level = 0 }: { task: Task; level?: number }) => (
    <div className={`space-y-2 ${level > 0 ? 'ml-6' : ''}`}>
      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
        <Checkbox
          checked={isTaskCompleted(task.id)}
          onCheckedChange={() => handleTaskToggle(task.id)}
          className="mt-1"
        />
        <div className="flex-1 space-y-2">
          <p className={`text-sm ${isTaskCompleted(task.id) ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </p>
          <div className="flex gap-2 flex-wrap">
            {task.id === 'weigh' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowWeightDialog(true)}
                className="h-7 px-2 text-xs"
              >
                <Scale className="w-3 h-3 mr-1" />
                Записать вес
              </Button>
            )}
            {task.hasVideo && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setSelectedVideo(task.videoUrl || '')}
                className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Play className="w-3 h-3 mr-1" />
                Видео
              </Button>
            )}
            {task.hasAudio && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setSelectedAudio(task.audioUrl || '')}
                className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Play className="w-3 h-3 mr-1" />
                Аудио
              </Button>
            )}
            {/* Social Media Links for social-share task */}
            {task.id === 'social-share' && (
              <div className="flex gap-2 flex-wrap mt-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open('https://instagram.com/morachkovskiy', '_blank')}
                  className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Instagram className="w-3 h-3 mr-1" />
                  Instagram
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open('https://tiktok.com/@morachkovskiy', '_blank')}
                  className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Video className="w-3 h-3 mr-1" />
                  TikTok
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open('https://youtube.com/@morachkovskiy', '_blank')}
                  className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Music className="w-3 h-3 mr-1" />
                  YouTube
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open('https://t.me/morachkovskiy', '_blank')}
                  className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Telegram
                </Button>
              </div>
            )}
            {task.hasInfo && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setSelectedSupplement(task.infoContent || '')}
                className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Info className="w-3 h-3 mr-1" />
                Подробнее
              </Button>
            )}
          </div>
        </div>
      </div>
      {task.subtasks?.map((subtask) => (
        <div key={subtask.id} className="ml-6">
          <div className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg border border-border/30">
            <Checkbox
              checked={isTaskCompleted(subtask.id)}
              onCheckedChange={() => handleTaskToggle(subtask.id)}
              className="mt-1"
            />
            <div className="flex-1 space-y-1">
              <p className={`text-sm ${isTaskCompleted(subtask.id) ? 'line-through text-muted-foreground' : ''}`}>
                {subtask.title}
              </p>
              {subtask.hasInfo && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => setSelectedSupplement(subtask.infoContent || '')}
                  className="h-6 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Info className="w-3 h-3 mr-1" />
                  Подробнее
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TimeBlockCard = ({ block, index }: { block: TimeBlock; index: number }) => {
    const Icon = block.icon;
    return (
      <Card className={`p-4 bg-gradient-to-br ${block.color} border-2 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <Icon size={80} className="text-current" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-background/20">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{block.title}</h3>
              <p className="text-sm text-muted-foreground">{block.timeRange}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {block.tasks.map((task, taskIndex) => (
              <div key={task.id}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                    {taskIndex + 1}
                  </span>
                </div>
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
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

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Расписание дня</h1>
          <p className="text-muted-foreground">{getDayName()}</p>
          
          {/* Progress Bar */}
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс дня</span>
                <span className="font-bold text-primary">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full h-3" />
            </div>
          </Card>
        </div>

        {/* Monday Fasting Choice */}
        {isMonday && (
          <Card className="p-4 border-2 border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-yellow-500/10">
            <h3 className="font-semibold mb-3 text-orange-800 dark:text-orange-200">Выберите режим дня:</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isFasting}
                  onCheckedChange={(checked) => setIsFasting(checked as boolean)}
                />
                <label className="text-sm">У меня сегодня день голода</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={!isFasting}
                  onCheckedChange={(checked) => setIsFasting(!(checked as boolean))}
                />
                <label className="text-sm">Я не придерживаюсь голода</label>
              </div>
            </div>
          </Card>
        )}

        {/* Sunday Measurements */}
        {isSunday && (
          <Card className="p-4 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Еженедельные измерения</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="chest">Охват груди (см)</Label>
                <Input
                  id="chest"
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, chest: e.target.value }))}
                  placeholder="Введите значение"
                />
              </div>
              <div>
                <Label htmlFor="waist">Охват талии (см)</Label>
                <Input
                  id="waist"
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, waist: e.target.value }))}
                  placeholder="Введите значение"
                />
              </div>
              <div>
                <Label htmlFor="hips">Охват бедер (см)</Label>
                <Input
                  id="hips"
                  type="number"
                  value={measurements.hips}
                  onChange={(e) => setMeasurements(prev => ({ ...prev, hips: e.target.value }))}
                  placeholder="Введите значение"
                />
              </div>
              <Button onClick={saveMeasurements} className="w-full">
                Сохранить измерения
              </Button>
            </div>
          </Card>
        )}

        {/* Time Blocks */}
        <div className="space-y-6">
          {timeBlocks.map((block, index) => (
            <div key={block.id}>
              <TimeBlockCard block={block} index={index} />
              {/* Treatment and Prevention between day and evening */}
              {block.id === 'day' && (
                <Card className="bg-dark-surface p-4 space-y-4 mt-4">
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
              )}
            </div>
          ))}
        </div>

        {/* Sunday Social Sharing */}
        {isSunday && (
          <Card className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30">
            <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">
              🥳 Воскресные задания
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox />
                <div className="flex-1">
                  <p className="text-sm">Поделиться отчётом прогресса за неделю (скриншот) в своих социальных сетях</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7 px-2 text-xs">
                    <Play className="w-3 h-3 mr-1" />
                    Видео: Как это сделать
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox />
                <p className="text-sm">Написать отзыв!</p>
              </div>
            </div>
          </Card>
        )}

        {/* Manager Contact Footer */}
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-sm">Нужна консультация?</h3>
            <p className="text-xs text-muted-foreground">Свяжитесь с персональным менеджером</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open('https://wa.me/77058838833', '_blank')}
              className="h-8 px-3 text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              WhatsApp: +7 705 883 88 33
            </Button>
          </div>
        </Card>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Обучающее видео</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            <p className="text-white">Видео: {selectedVideo}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audio Modal */}
      <Dialog open={!!selectedAudio} onOpenChange={() => setSelectedAudio(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Аудио сообщение</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-lg flex items-center justify-center">
            <p>Аудио: {selectedAudio}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Modal */}
      <Dialog open={!!selectedInfo} onOpenChange={() => setSelectedInfo(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Подробная информация</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-sm">{selectedInfo}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Supplement Info Modal */}
      <Dialog open={!!selectedSupplement} onOpenChange={() => setSelectedSupplement(null)}>
        <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
          <div className="space-y-6 pb-4">
            {selectedSupplement === 'fat-burner' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о жиросжигателе</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое жиросжигатель ночной?</h2>
                  <p className="text-muted-foreground">
                    Жиросжигатель ночной - это натуральная добавка с Пиколинатом Хрома и Гарцинией, 
                    специально разработанная для ускорения метаболизма и контроля аппетита в ночное время.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Состав:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Пиколинат Хрома</strong> - регулирует уровень сахара в крови</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Гарциния</strong> - подавляет аппетит и блокирует образование жира</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌙</span>
                        <span><strong>Время:</strong> 21:00 вечером</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 2 капсулы (для лучшего результата первые 2 недели - 4 капсулы)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💧</span>
                        <span><strong>Запивать:</strong> достаточным количеством воды</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Почему именно вечером?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ночное время - это период активного восстановления и очищения организма. 
                      Прием жиросжигателя вечером помогает ускорить метаболизм во время сна и 
                      обеспечивает лучшее сжигание жиров.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedSupplement === 'vitamin-c' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-6 rounded-xl border border-orange-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о витамине C</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое Витамин C?</h2>
                  <p className="text-muted-foreground">
                    Витамин C 500мг - мощный антиоксидант, который защищает клетки от повреждений, 
                    укрепляет иммунную систему и способствует выработке коллагена.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Действие:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Антиоксидантная защита</strong> - борьба со свободными радикалами</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Поддержка иммунитета</strong> - укрепление защитных сил организма</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span><strong>Синтез коллагена</strong> - здоровье кожи и соединительной ткани</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌅</span>
                        <span><strong>Время:</strong> утром с завтраком</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 1 капсула (500мг)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <span><strong>Прием:</strong> с едой для лучшего усвоения</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'berberin' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о берберине</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое Берберин?</h2>
                  <p className="text-muted-foreground">
                    Берберин 500мг - натуральное растительное соединение, которое помогает 
                    нормализовать уровень глюкозы в крови и поддерживает здоровье пищеварительной системы.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Действие:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Нормализует уровень глюкозы</strong> в крови</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Поддерживает сердечно-сосудистую систему</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Детокс печени</strong> и улучшение оттока желчи</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Улучшает пищеварение</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⏰</span>
                        <span><strong>Время:</strong> за 15 минут до каждого приема пищи</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 1 капсула (500мг)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <span><strong>Строго натощак</strong> (за 2 часа до или после еды)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Почему именно натощак?</h3>
                    <p className="text-sm text-muted-foreground">
                      Кальций из пищи может блокировать усвоение берберина. 
                      Прием натощак обеспечивает максимальную биодоступность минерала.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'd3-k2' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 p-6 rounded-xl border border-yellow-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о комплексе D3+K2</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое комплекс D3+K2?</h2>
                  <p className="text-muted-foreground">
                    Синергетическая комбинация витаминов D3 (5000 МЕ) и K2 (50 мкг), 
                    которая обеспечивает правильное усвоение кальция и укрепление костной системы.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Действие:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span><strong>Усвоение кальция</strong> - направляет кальций в кости, а не в артерии</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span><strong>Укрепление костей и волос</strong></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span><strong>Профилактика аутоиммунных заболеваний</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📅</span>
                        <span><strong>1-й месяц:</strong> по 2 таблетки (10000 МЕ)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔬</span>
                        <span><strong>2-й месяц:</strong> сдать анализ на витамин D</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Удобно делить:</strong> на порции по 1250 МЕ</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Почему важна комбинация D3+K2?</h3>
                    <p className="text-sm text-muted-foreground">
                      Витамин D3 увеличивает усвоение кальция, а K2 направляет его именно в кости, 
                      предотвращая отложение в артериях и мягких тканях.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'women-complex' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о женском комплексе</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое женский комплекс?</h2>
                  <p className="text-muted-foreground">
                    Специально разработанный мультивитаминный комплекс с 30 активными ингредиентами 
                    для поддержки женского здоровья, красоты и гормонального баланса.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Действие:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span><strong>Красота</strong> - здоровье кожи, волос и ногтей</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span><strong>Гормональный баланс</strong> - поддержка женской эндокринной системы</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        <span><strong>Иммунная поддержка</strong> - 30 активных ингредиентов</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <span><strong>Время:</strong> с едой 1 раз в день</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 3 капсулы за один прием</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📦</span>
                        <span><strong>Упаковка:</strong> 30 порций, 90 капсул</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'collagen' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о коллагене</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое коллаген?</h2>
                  <p className="text-muted-foreground">
                    Комплексная формула с коллагеном, глюкозамином, хондроитином и витамином C 
                    с приятным вкусом детского питания для поддержки красоты и здоровья суставов.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Состав:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>Коллаген</strong> - основной белок кожи и суставов</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>Глюкозамин + Хондроитин</strong> - строительные блоки хрящевой ткани</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>Витамин C</strong> - синтез собственного коллагена</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⏰</span>
                        <span><strong>Время:</strong> в любое время с едой или без</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🥄</span>
                        <span><strong>Профилактика:</strong> 1 мерная ложка в день</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🩹</span>
                        <span><strong>Лечение:</strong> 2 мерные ложки в день</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Приятный вкус!</h3>
                    <p className="text-sm text-muted-foreground">
                      Наш коллаген имеет приятный вкус детского питания, что делает его прием 
                      не только полезным, но и приятным каждый день.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'omega-3' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-xl border border-blue-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео об Омега-3</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое Омега-3?</h2>
                  <p className="text-muted-foreground">
                    Высококонцентрированные жирные кислоты EPA (720мг) и DHA (480мг) 
                    в маленьких капсулах, подходящих даже для детей.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Состав:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>EPA 720мг</strong> - противовоспалительное действие</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span><strong>DHA 480мг</strong> - здоровье мозга и глаз</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Действие:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span><strong>Здоровый мозг</strong> - улучшение когнитивных функций</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span><strong>Мышцы и кости</strong> - поддержка опорно-двигательного аппарата</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <span><strong>Подходит для детей</strong> - безопасная формула</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <span><strong>Время:</strong> во время еды</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 4 капсулы в день</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📦</span>
                        <span><strong>Упаковка:</strong> 30 порций, 120 капсул</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Маленький размер капсул!</h3>
                    <p className="text-sm text-muted-foreground">
                      Наши капсулы Омега-3 имеют маленький размер, что делает их удобными 
                      для приема даже детьми и людьми, которым сложно глотать большие капсулы.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'apple-vinegar' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 rounded-xl border border-red-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о яблочном уксусе</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое яблочный уксус в капсулах?</h2>
                  <p className="text-muted-foreground">
                    Ферментированный яблочный уксус 500мг в удобной капсульной форме 
                    с улучшенной биодоступностью для поддержки пищеварения и метаболизма.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Преимущества:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Ферментированный</strong> - лучшая биодоступность</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Без вкуса и запаха</strong> - в удобных капсулах</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span><strong>Поддержка пищеварения</strong> - улучшает метаболизм</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⏰</span>
                        <span><strong>Время:</strong> за 15 минут до еды вместе с берберином</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Обычно:</strong> 1 капсула перед каждым приемом пищи</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔬</span>
                        <span><strong>При диабете/инсулинорезистентности:</strong> 2 капсулы</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Почему вместе с берберином?</h3>
                    <p className="text-sm text-muted-foreground">
                      Яблочный уксус и берберин работают синергетически, усиливая действие 
                      друг друга в нормализации уровня сахара в крови и улучшении пищеварения.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedSupplement === 'zma' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-xl border border-green-500/20">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 mx-auto mb-2 text-white" />
                      <p className="text-white text-sm">Видео о ZMA</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => window.open('https://wa.me/77058838833', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Связаться с менеджером
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline"
                    onClick={() => window.location.href = '/shop'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Купить
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Что такое ZMA?</h2>
                  <p className="text-muted-foreground">
                    ZMA - это синергетическая комбинация цинка, магния и витамина B6, 
                    специально разработанная для максимального усвоения и эффективности.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Состав:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Цинк</strong> - поддержка иммунитета и гормонального баланса</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Магний</strong> - здоровье мышц и нервной системы</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span><strong>Витамин B6</strong> - улучшение усвоения цинка и магния</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Правила приема:
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌅</span>
                        <span><strong>Время:</strong> утром натощак</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <span><strong>Строго натощак</strong> (за 2 часа до или после еды)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💊</span>
                        <span><strong>Дозировка:</strong> 3 капсулы</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💧</span>
                        <span><strong>Запивать</strong> большим количеством воды</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Почему именно натощак?</h3>
                    <p className="text-sm text-muted-foreground">
                      Кальций из пищи может блокировать усвоение цинка и магния. 
                      Прием натощак обеспечивает максимальную биодоступность минералов.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Weight Input Dialog */}
      <Dialog open={showWeightDialog} onOpenChange={setShowWeightDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Запись веса</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Введите ваш текущий вес (кг)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="Например: 65.5"
                className="text-center text-lg"
              />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              📊 Ваш вес будет сохранен для отслеживания динамики в личном кабинете
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowWeightDialog(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button 
                onClick={saveWeight}
                disabled={!weightInput}
                className="flex-1"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}