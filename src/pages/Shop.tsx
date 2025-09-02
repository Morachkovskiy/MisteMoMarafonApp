import { PricingCard } from "@/components/ui/pricing-card";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  {
    title: "БАЗОВЫЙ - БЕСПЛАТНО",
    subtitle: "Темы / Меню / Чеклист / Расписание дня / Справочник продуктов / Дыхательная гимнастика / Зарядка",
    features: [
      { text: "Разрешенный или запрещенный КБЖУ", included: true },
      { text: "MisterMo Genetics Пройти генетическое тестирование", included: true },
      { text: "Узнай себя! Участник", included: true },
      { text: "ДЕСЕРТЫ ФРАНШИЗА ПАРТНЕРСТВО", included: true },
      { text: "ДОСТАВКА ПИТАНИЯ В Казахстане ПОЛУЧИ СКИДКУ", included: true },
      { text: "РЕФЕРАЛЬНОЙ ССЫЛКОЙ получи доступ во всех функциях", included: false }
    ],
    buttonText: "НАЧАТЬ БАЗОВЫЙ КУРС"
  },
  {
    title: "ПРОДВИНУТЫЙ - 30 000тг",
    subtitle: "(или покупка витаминов на 30000тг)",
    originalPrice: "50000тг",
    price: "30 000тг", 
    features: [
      { text: "ТОЖЕ САМОЕ ЧТО БАЗОВЫЙ + ЧАТ общения и поддержки", included: true },
      { text: "Рецепты", included: true },
      { text: "Сканер еды", included: true },
      { text: "(сам определяет калории по фото)", included: true },
      { text: "Аналитика и статистика", included: true },
      { text: "Дополнительные темы", included: true },
      { text: "Вечный доступ к темам", included: true }
    ],
    buttonText: "КУПИТЬ ПРОДВИНУТЫЙ КУРС",
    isPopular: true
  },
  {
    title: "ПРЕМИУМ - 50 000тг", 
    subtitle: "(или покупка витаминов на 50000тг)",
    price: "50 000тг",
    features: [
      { text: "ТОЖЕ САМОЕ ЧТО ПРОДВИНУТЫЙ + Фитнес", included: true },
      { text: "Фейсбилдинг", included: true },
      { text: "MisterMo Genetics Пройти генетическое тестирование", included: true },
      { text: "Узнай себя! Участник", included: true },
      { text: "ДЕСЕРТЫ ФРАНШИЗА ПАРТНЕРСТВО", included: true },
      { text: "ДОСТАВКА ПИТАНИЯ В Казахстане ПОЛУЧИ СКИДКУ", included: true },
      { text: "РЕФЕРАЛЬНОЙ ССЫЛКОЙ получи доступ во всех функциях", included: true }
    ],
    buttonText: "КУПИТЬ ПРЕМИУМ КУРС"
  }
];

export default function Shop() {
  const { user, updateSubscriptionTier } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (tier: 'basic' | 'advanced' | 'premium') => {
    setLoading(true);
    try {
      await updateSubscriptionTier(tier);
      toast({
        title: "Тариф обновлен!",
        description: `Вы успешно приобрели ${tier} тариф`,
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить тариф",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-lg">💰</span>
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

      <div className="px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Выберите тариф</h1>
          <p className="text-muted-foreground">Получите доступ к системе Морачковского</p>
        </div>

        <div className="space-y-6">
          {pricingPlans.map((plan, index) => {
            const isCurrentPlan = 
              (plan.title.includes('БАЗОВЫЙ') && user?.subscription_tier === 'basic') ||
              (plan.title.includes('ПРОДВИНУТЫЙ') && user?.subscription_tier === 'advanced') ||
              (plan.title.includes('ПРЕМИУМ') && user?.subscription_tier === 'premium');
            
            const tier = plan.title.includes('ПРОДВИНУТЫЙ') ? 'advanced' : 
                        plan.title.includes('ПРЕМИУМ') ? 'premium' : 'basic';

            return (
              <PricingCard
                key={index}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                originalPrice={plan.originalPrice}
                features={plan.features}
                buttonText={isCurrentPlan ? "ТЕКУЩИЙ ТАРИФ" : plan.buttonText}
                isPopular={plan.isPopular}
                onPurchase={() => !isCurrentPlan && handlePurchase(tier)}
                disabled={isCurrentPlan || loading}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Выберите подходящий план и начните свой путь к здоровью
          </p>
          <div className="text-xs text-muted-foreground">
            <p>✓ Безопасная оплата</p>
            <p>✓ Моментальный доступ</p>
            <p>✓ Поддержка 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}