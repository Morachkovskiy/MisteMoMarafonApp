import { MessageCircle, Users, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const openTelegramGroup = () => {
    // Замените на ваш реальный Telegram канал/группу
    window.open("https://t.me/mistermo_chat", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
            <MessageCircle size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Общение</h1>
            <p className="text-sm text-white/80">Групповой чат участников</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Main Chat Card */}
        <Card className="bg-dark-surface p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Users size={32} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">
              Telegram чат сообщества
            </h2>
            <p className="text-sm text-muted-foreground">
              Присоединяйтесь к нашему Telegram каналу для общения с экспертом 
              и другими участниками программы Морачковского
            </p>
          </div>

          <Button 
            onClick={openTelegramGroup}
            className="w-full bg-primary text-black font-semibold hover:bg-primary/90"
            size="lg"
          >
            <MessageCircle size={20} className="mr-2" />
            Присоединиться к чату
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </Card>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">В нашем чате вы получите:</h3>
          
          <div className="space-y-3">
            <Card className="bg-dark-surface p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">👨‍⚕️</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Прямой контакт с экспертом</h4>
                  <p className="text-xs text-muted-foreground">Ответы на ваши вопросы от Никиты Морачковского</p>
                </div>
              </div>
            </Card>

            <Card className="bg-dark-surface p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">🤝</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Поддержка сообщества</h4>
                  <p className="text-xs text-muted-foreground">Общение с единомышленниками и обмен опытом</p>
                </div>
              </div>
            </Card>

            <Card className="bg-dark-surface p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">📚</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Эксклюзивные материалы</h4>
                  <p className="text-xs text-muted-foreground">Дополнительные советы и рекомендации</p>
                </div>
              </div>
            </Card>

            <Card className="bg-dark-surface p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">⚡</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Быстрые ответы</h4>
                  <p className="text-xs text-muted-foreground">Активное сообщество отвечает 24/7</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Rules */}
        <Card className="bg-dark-surface p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Правила чата</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Будьте вежливы и уважительны к другим участникам</p>
            <p>• Задавайте вопросы по программе и делитесь опытом</p>
            <p>• Никакого спама и рекламы сторонних продуктов</p>
            <p>• Эксперт отвечает с 9:00 до 21:00 (МСК)</p>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20 p-4 text-center">
          <p className="text-sm text-foreground mb-3">
            Не упустите возможность получить поддержку и советы от эксперта!
          </p>
          <Button 
            onClick={openTelegramGroup}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-black"
          >
            Присоединиться сейчас
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Card>
      </div>
    </div>
  );
}