import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Welcome() {
  const navigate = useNavigate();

  const problems = [
    "Диабет 2 типа",
    "Проблемы с желчным пузырем", 
    "Панкреатит",
    "Гепатоз печени",
    "Цирроз печени",
    "Инсулинорезистентность",
    "Кортикорезистентность",
    "Синдром Поликистозных яичников",
    "Щитовидная железа",
    "Гипертония",
    "Акне и Псориаз",
    "и др. заболевания"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with gradient background */}
      <div className="bg-primary px-4 py-8 rounded-b-3xl">
        <div className="text-center space-y-4">
          <div className="w-28 h-20 mx-auto">
            <img 
              src="/lovable-uploads/f013bf5a-7942-4ed0-aaac-dbe0ac8b7022.png" 
              alt="MisterMO Health" 
              className="w-full h-full object-contain" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">👋</span>
              <p className="text-lg font-semibold text-primary-foreground">Привет Никита!</p>
            </div>
            <p className="text-sm text-primary-foreground/80">Сегодня тот самый день!</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <Card className="bg-dark-surface p-4">
          <p className="text-center text-foreground font-medium">
            Привет Никита!<br/>
            Я рад тебя приветствовать в нашем<br/>
            Мире Генетического здоровья
          </p>
        </Card>

        {/* Doctor Info Card with Photo */}
        <Card className="bg-gradient-to-br from-lime-400 via-lime-500 to-green-500 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-gray-800">
                Морачковский<br/>Никита
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Ученый-исследователь.</p>
                <p>Автор книг и методик.</p>
                <p>Эксперт в области генетики и эндокринологии.</p>
                <p>Студент Stanford Medicine.</p>
                <p>Создатель одноименной системы Генетического здоровья.</p>
                <p>Создатель системы по выходу из голода за один день.</p>
              </div>
            </div>
            <div className="w-32 h-40 flex-shrink-0">
              <img 
                src="/lovable-uploads/6f88d9a0-7f1c-4af4-9f5a-35cfcbb2839f.png" 
                alt="Никита Морачковский" 
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="w-20 h-10">
              <img 
                src="/lovable-uploads/920abd2a-2881-431f-b7e6-2c8ee98a4591.png" 
                alt="Morachkovsky Academy" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="w-20 h-8">
              <img 
                src="/lovable-uploads/f8e46835-07e7-4d2d-97d1-6c4c12bd0248.png" 
                alt="Stanford Medicine" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </Card>

        {/* System Info */}
        <Card className="bg-dark-surface p-6 space-y-4">
          <h3 className="text-lg font-bold text-primary text-center">
            Генетическая система<br/>Морачковского
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Помогает Вам решить проблемы:</p>
            <div className="space-y-1">
              {problems.map((problem, index) => (
                <p key={index} className="text-sm text-muted-foreground">• {problem}</p>
              ))}
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Button 
          onClick={() => navigate('/questionnaire')}
          className="w-full h-14 text-lg font-semibold"
        >
          НАЧАТЬ ИЗУЧЕНИЕ
        </Button>
      </div>
    </div>
  );
}