import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Education = () => {
  const handleContactManager = () => {
    window.open('https://wa.me/79999999999', '_blank');
  };

  return (
    <div className="min-h-screen bg-dark-background text-foreground">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            ОБУЧЕНИЕ
          </h1>
          <p className="text-lg text-muted-foreground">
            Генетическая система здоровья, Нутропатия, Нутрициология
          </p>
        </div>

        {/* Information about Mr. MO */}
        <Card className="bg-dark-surface p-6">
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/01943daa-db09-4dcb-a70c-9df8145da00e.png" 
              alt="Мистер МО"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-primary mb-2">Мистер МО</h2>
            <p className="text-lg text-muted-foreground">Эксперт в области здоровья и нутрициологии</p>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground leading-relaxed mb-4">
              Добро пожаловать в мир комплексного подхода к здоровью! Мистер МО - ведущий специалист 
              в области генетической системы здоровья, нутропатии и нутрициологии с более чем 15-летним 
              опытом работы.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Наши программы обучения охватывают революционные методики восстановления здоровья на 
              клеточном уровне, основанные на глубоком понимании генетических особенностей каждого 
              человека и принципах функциональной медицины.
            </p>
            <p className="text-foreground leading-relaxed">
              Присоединяйтесь к сообществу профессионалов, которые меняют подход к здоровью и помогают 
              людям обрести истинное благополучие через научно обоснованные методы питания и коррекции 
              образа жизни.
            </p>
          </div>
        </Card>

        {/* Video Block */}
        <Card className="bg-dark-surface p-6">
          <h3 className="text-xl font-bold text-primary mb-4">Обучающее видео</h3>
          <div className="aspect-video bg-dark-background rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-muted-foreground">Видео скоро будет доступно</p>
            </div>
          </div>
        </Card>

        {/* Image Block */}
        <Card className="bg-dark-surface p-6">
          <h3 className="text-xl font-bold text-primary mb-4">Методология обучения</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img 
              src="/lovable-uploads/8080f454-58b8-4bd5-9953-e3a3970b13c9.png" 
              alt="Команда профессионалов"
              className="w-full h-48 object-cover rounded-lg"
            />
            <img 
              src="/lovable-uploads/4ab86e97-de0b-4cf9-b277-530c2ce3b58d.png" 
              alt="Повышение квалификации"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </Card>

        {/* Contact Button */}
        <div className="text-center pt-8">
          <Button 
            onClick={handleContactManager}
            className="bg-primary text-black font-semibold hover:bg-primary/90 px-8 py-3 text-lg"
          >
            Для покупки связаться с менеджером
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;