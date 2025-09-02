import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Thyroid() {
  const navigate = useNavigate()

  const handleWhatsApp = () => {
    window.open('https://wa.me/your-manager-number', '_blank')
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/themes')}
            className="text-primary-foreground hover:bg-white/10 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-primary-foreground">
            Щитовидная железа - Лечение и Профилактика
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
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
                Специалист по заболеваниям щитовидной железы.
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

        {/* Обучающие видео */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Лечение щитовидной железы</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: 'Гормоны щитовидной железы',
                description: 'Понимание работы щитовидной железы и гормонального баланса',
                youtubeId: 'ZU2yWlpmjNA'
              },
              {
                title: 'Гипотиреоз и гипертиреоз',
                description: 'Диагностика и лечение заболеваний щитовидной железы',
                youtubeId: 'ZU2yWlpmjNA'
              },
              {
                title: 'Питание для щитовидной железы',
                description: 'Продукты и добавки для здоровья щитовидной железы',
                youtubeId: 'ZU2yWlpmjNA'
              }
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden">
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

        {/* Кнопки действий */}
        <div className="grid grid-cols-1 gap-3">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full"
          >
            Попробовать бесплатно
          </Button>
          <Button 
            size="lg"
            onClick={handleWhatsApp}
            className="w-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Приобрести курс
          </Button>
        </div>
      </div>
    </div>
  )
}