import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "БАЗОВЫЙ",
      price: "БЕСПЛАТНО",
      features: [
        "Меню",
        "Чеклист", 
        "Расписание дня",
        "Справочник продуктов",
        "Дыхательная гимнастика",
        "Зарядки"
      ],
      buttonText: "НАЧАТЬ БАЗОВЫЙ КУРС",
      buttonAction: () => { localStorage.setItem('subscription_tier','basic'); navigate('/dashboard') },
      popular: false
    },
    {
      name: "ПРОДВИНУТЫЙ",
      price: "30 000тг",
      subtitle: "(или покупка витаминов на 30000тг)",
      features: [
        "Все из БАЗОВОГО +",
        "Чат общения и поддержки",
        "Рецепты",
        "Сканер еды (сам определяет калории по фото)",
        "Семинары и статьи",
        "Дополнительные темы (разбор питания, анализы)"
      ],
      buttonText: "КУПИТЬ ПРОДВИНУТЫЙ КУРС",
      secondButtonText: "КУПИТЬ ВИТАМИНЫ И ПОЛУЧИТЬ ДОСТУП",
      buttonAction: () => { localStorage.setItem('subscription_tier','advanced'); navigate('/dashboard') },
      popular: true
    },
    {
      name: "ПРЕМИУМ",
      price: "50 000тг",
      subtitle: "(или покупка витаминов на 50000тг)",
      features: [
        "Все из ПРОДВИНУТОГО +",
        "Связь со мной",
        "Фейсбилдинг"
      ],
      buttonText: "КУПИТЬ ПРЕМИУМ КУРС",
      secondButtonText: "КУПИТЬ ВИТАМИНЫ И ПОЛУЧИТЬ ДОСТУП",
      buttonAction: () => { localStorage.setItem('subscription_tier','premium'); navigate('/dashboard') },
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="text-center space-y-2">
          <div className="w-20 h-16 mx-auto">
            <img 
              src="/lovable-uploads/f013bf5a-7942-4ed0-aaac-dbe0ac8b7022.png" 
              alt="MisterMO Health" 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-xl font-bold text-primary-foreground">
            Выберите свой тариф
          </h1>
          <p className="text-sm text-primary-foreground/80">
            Начните путь к здоровью уже сегодня
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {plans.map((plan, index) => (
          <Card key={index} className={`bg-dark-surface p-6 relative ${plan.popular ? 'border-primary' : 'border-border'}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                Популярный
              </Badge>
            )}
            
            <div className="space-y-4">
              {/* Plan Header */}
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                  {plan.subtitle && (
                    <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={plan.buttonAction}
                  className="w-full h-12 font-semibold"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
                
                {plan.secondButtonText && (
                  <Button 
                    onClick={plan.buttonAction}
                    variant="outline"
                    className="w-full h-12 font-semibold"
                  >
                    {plan.secondButtonText}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}