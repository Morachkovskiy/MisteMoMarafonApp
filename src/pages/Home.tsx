import { useState } from "react";
import { User, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionnaireCard } from "@/components/ui/questionnaire-card";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const questionnaire = [
  {
    id: "height",
    question: "Твой РОСТ (пример: 175)",
    options: [
      { id: "da", label: "Да" },
      { id: "net", label: "Нет", isHighlighted: true },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "weight", 
    question: "Твой ВЕС (пример: 75)",
    options: [
      { id: "da", label: "Да" },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "age",
    question: "Твой ВОЗРАСТ (пример: 38)",
    options: [
      { id: "da", label: "Да" },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "liver",
    question: "Проблемы печени или ЖКТ",
    options: [
      { id: "da", label: "Да", isHighlighted: true },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "diabetes",
    question: "Диабет или инсулинорезистентность",
    options: [
      { id: "da", label: "Да", isHighlighted: true },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "thyroid",
    question: "Проблемы щитовидной железы",
    options: [
      { id: "da", label: "Да" },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "hypertension",
    question: "Гипертония (Давление)",
    options: [
      { id: "da", label: "Да", isHighlighted: true },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю" }
    ]
  },
  {
    id: "tumors",
    question: "Образования (миома, киста, опухоль)",
    options: [
      { id: "da", label: "Да" },
      { id: "net", label: "Нет" },
      { id: "neznayu", label: "Незнаю", isHighlighted: true }
    ]
  }
];

export default function Home() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [goals, setGoals] = useState<Record<string, boolean>>({
    lose: false,
    recover: false,
    improve: false
  });

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleGoalToggle = (goalId: string) => {
    setGoals(prev => ({ ...prev, [goalId]: !prev[goalId] }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">
                Привет {user?.first_name || 'Никита'}!
              </p>
              <p className="text-xs text-primary-foreground/60">Сегодня тот самый день!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary-foreground">mister°</p>
            <p className="text-lg font-bold text-primary-foreground">MO</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Introduction */}
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-foreground">
            Привет Никита!<br />
            Я рад тебя приветствовать в нашем<br />
            Мире Генетического здоровья
          </h1>
        </div>

        {/* Expert Card */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
              <img 
                src="/lovable-uploads/f6b840c9-86d8-4902-8828-7b606e1b5a55.png" 
                alt="Никита Морачковский" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-lg font-bold text-primary">НИКИТА МОРАЧКОВСКИЙ</h3>
              <p className="text-sm text-muted-foreground">Ученый-исследователь</p>
              <p className="text-xs text-muted-foreground">Автор книг и методик</p>
              
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Эксперт в области генетики, эндокринологии и лечебного голодания.</p>
                <p>Создатель одноименной системы генетического здоровья.</p>
                <p>Создатель системы по выходу из голода за один день.</p>
                <p>Студент Stanford Medicine</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <GraduationCap size={16} className="text-white" />
                </div>
                <div className="text-xs">
                  <p className="text-primary font-medium">МОРАЧКОВСКИЙ ACADEMY</p>
                  <p className="text-muted-foreground">Stanford Medicine</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">@morachkovskiy</p>
            </div>
          </div>
          
          <Button className="w-full">НАЧАТЬ ИЗУЧЕНИЕ</Button>
        </Card>

        {/* System Info */}
        <Card className="bg-dark-surface p-4 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <img 
              src="/lovable-uploads/3d5c3c02-836a-4c37-a790-566d0bc12bd1.png" 
              alt="Background decoration" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-primary">
              Генетическая система<br />Морачковского
            </h3>
            <p className="text-sm text-muted-foreground">
              поможет Вам решить проблемы:
            </p>
          </div>
          
          <div className="space-y-2 text-sm relative z-10">
            {[
              "- Диабет 2 тип",
              "- Проблемы с Желчным пузырем", 
              "- Панкреатит",
              "- Гепатоз печени",
              "- Цирроз печени",
              "- Инсулинорезистентность",
              "- Кортизолорезистентность",
              "- Синдром Поликистозных яичников",
              "- Щитовидная железа",
              "- Гипертония",
              "- Акне и Псориаз",
              "- и др. заболевания"
            ].map((item, index) => (
              <p key={index} className="text-muted-foreground">{item}</p>
            ))}
          </div>
        </Card>

        {/* Help Message */}
        <Card className="bg-dark-surface p-4 space-y-4 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
            <img 
              src="/lovable-uploads/6462592d-c9dd-4788-9e48-3497f1bccfdf.png" 
              alt="Background decoration" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-foreground relative z-10">
            Что бы я мог помочь тебе<br />
            с Похудением и Оздоровлением,<br />
            я должен задать тебе вопросы!
          </p>
          
          <div className="space-y-4 relative z-10">
            {questionnaire.map((question) => (
              <QuestionnaireCard
                key={question.id}
                question={question.question}
                options={question.options}
                selectedOption={answers[question.id]}
                onOptionSelect={(optionId) => handleAnswerSelect(question.id, optionId)}
              />
            ))}
          </div>

          {/* Goals */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-sm font-medium text-foreground">Ваши цели</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "lose", label: "Похудеть" },
                { id: "recover", label: "Оздоровиться" }, 
                { id: "improve", label: "Похудеть и оздоровиться", highlight: true }
              ].map((goal) => (
                <Button
                  key={goal.id}
                  variant={goals[goal.id] ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`h-auto py-3 px-4 text-xs font-medium ${
                    goal.highlight && !goals[goal.id] ? "bg-primary/10 text-primary border-primary/20" : ""
                  }`}
                >
                  {goal.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="space-y-2 text-xs relative z-10">
            <p className="text-foreground font-medium">Откуда Вы узнали о Системе Морачковского</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Интернет", active: false },
                { label: "Друзья", active: false },
                { label: "Посоветовал врач", active: true }
              ].map((source, index) => (
                <Button
                  key={index}
                  variant={source.active ? "default" : "outline"}
                  size="sm"
                  className="h-auto py-2 px-3 text-xs"
                >
                  {source.label}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full mt-6 relative z-10"
            onClick={() => window.location.href = '/'}
          >
            НАЧАТЬ ИЗУЧЕНИЕ
          </Button>
        </Card>
      </div>
    </div>
  );
}