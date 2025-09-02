import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: '',
    phone: '',
    email: '',
    height: '',
    weight: '',
    age: '',
    liverProblems: '',
    diabetes: '',
    thyroidProblems: '',
    hypertension: '',
    formations: '',
    goals: '',
    source: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast({
        title: "Ошибка",
        description: "Пользователь не авторизован",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    
    try {
      console.log('Submitting onboarding form for user:', user.id);
      
      // Сохраняем данные анкеты через наш API
      const result = await api.saveOnboarding(user.id, formData);
      
      if (result) {
        console.log('Onboarding saved successfully');
        
        // Отмечаем onboarding как завершенный
        await completeOnboarding();
        
        toast({
          title: "Анкета заполнена!",
          description: "Добро пожаловать в систему здоровья Морачковского!"
        });
        
        // Перенаправляем на страницу тарифов
        navigate('/pricing');
      } else {
        throw new Error('Failed to save onboarding data');
      }
    } catch (error) {
      console.error('Onboarding save failed:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить анкету. Попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = formData.firstName && formData.height && formData.weight && 
                     formData.age && formData.liverProblems && formData.diabetes && 
                     formData.thyroidProblems && formData.hypertension && 
                     formData.formations && formData.goals && formData.source;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-lime-400 via-lime-500 to-green-500 px-4 py-6 rounded-b-3xl">
        <div className="text-center space-y-4">
          <div className="w-24 h-16 mx-auto">
            <img 
              src="/lovable-uploads/f013bf5a-7942-4ed0-aaac-dbe0ac8b7022.png" 
              alt="MisterMO Health" 
              className="w-full h-full object-contain drop-shadow-lg" 
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-800">
              Генетическая система здоровья
            </h1>
            <p className="text-sm text-gray-700">
              Заполните анкету для персональной программы
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Card className="bg-dark-surface p-4">
          <p className="text-center text-foreground font-medium mb-6">
            Что бы я мог помочь тебе с Похудением и Оздоровлением, я должен задать тебе вопросы!
          </p>
        </Card>

        {/* Personal Info */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Личные данные</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">Имя *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Введите ваше имя"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Введите вашу фамилию"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
              />
            </div>
          </div>
        </Card>

        {/* Physical Data */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Физические данные</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height">Рост *</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="175"
              />
            </div>
            
            <div>
              <Label htmlFor="weight">Вес *</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="75"
              />
            </div>
            
            <div>
              <Label htmlFor="age">Возраст *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="38"
              />
            </div>
          </div>
        </Card>

        {/* Health Questions */}
        <div className="space-y-4">
          {[
            { field: 'liverProblems', title: 'Проблемы печени или ЖКТ' },
            { field: 'diabetes', title: 'Диабет или инсулинорезистентность' },
            { field: 'thyroidProblems', title: 'Проблемы щитовидной железы' },
            { field: 'hypertension', title: 'Гипертония (Давление)' },
            { field: 'formations', title: 'Образования (миома, киста, опухоль)' }
          ].map((question) => (
            <Card key={question.field} className="bg-dark-surface p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">
                {question.title}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['Да', 'Нет', 'Незнаю'].map((option) => (
                  <Button
                    key={option}
                    variant={formData[question.field as keyof typeof formData] === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange(question.field, option)}
                    className="h-auto py-3 text-xs"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Goals */}
        <Card className="bg-dark-surface p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Ваши цели</h3>
          <div className="grid grid-cols-1 gap-3">
            {['Похудеть и оздоровиться', 'Похудеть'].map((goal) => (
              <Button
                key={goal}
                variant={formData.goals === goal ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange('goals', goal)}
                className="h-auto py-3 text-xs"
              >
                {goal}
              </Button>
            ))}
          </div>
        </Card>

        {/* Source */}
        <Card className="bg-dark-surface p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Откуда Вы узнали о Системе Морачковского
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {['Интернет', 'Друзья', 'Посоветовал врач'].map((source) => (
              <Button
                key={source}
                variant={formData.source === source ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange('source', source)}
                className="h-auto py-3 text-xs"
              >
                {source}
              </Button>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid || submitting}
          className="w-full h-12 text-lg font-semibold"
        >
          {submitting ? "Сохранение..." : "НАЧАТЬ ИЗУЧЕНИЕ"}
        </Button>
      </div>
    </div>
  );
}