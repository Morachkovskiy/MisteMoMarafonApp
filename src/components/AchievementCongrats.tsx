import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Share2, Instagram, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface AchievementCongratsProps {
  achievement: Achievement;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementCongrats({ achievement, isOpen, onClose }: AchievementCongratsProps) {
  const { toast } = useToast();

  const shareToInstagram = () => {
    const text = `🎉 Новое достижение!\n\n${achievement.icon} ${achievement.title}\n${achievement.description}\n\n#МистерМО #ЗдоровыйОбразЖизни #Достижение`;
    
    // Проверяем если мы в Telegram Web App
    if (window.Telegram?.WebApp) {
      // Открываем Instagram Stories
      const instagramUrl = `https://www.instagram.com/stories/camera/?text=${encodeURIComponent(text)}`;
      window.open(instagramUrl, '_blank');
    } else {
      // Для обычного браузера копируем текст
      navigator.clipboard.writeText(text);
      toast({
        title: "Текст скопирован!",
        description: "Вставьте его в Instagram Stories"
      });
    }
  };

  const copyToClipboard = () => {
    const text = `🎉 Новое достижение!\n\n${achievement.icon} ${achievement.title}\n${achievement.description}\n\n#МистерМО #ЗдоровыйОбразЖизни #Достижение`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: "Поделитесь своим достижением в социальных сетях"
    });
  };

  if (!achievement.unlocked) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-yellow-300 max-w-sm mx-auto">
        <div className="text-center space-y-6 py-6">
          {/* Logo */}
          <div className="w-24 h-16 mx-auto">
            <img 
              src="/lovable-uploads/f013bf5a-7942-4ed0-aaac-dbe0ac8b7022.png" 
              alt="MisterMO Health" 
              className="w-full h-full object-contain" 
            />
          </div>

          {/* Achievement */}
          <div className="space-y-4">
            <div className="text-6xl">🏆</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-amber-900">Поздравляем!</h2>
              <h3 className="text-lg font-semibold text-amber-800">{achievement.title}</h3>
              <p className="text-sm text-amber-700">{achievement.description}</p>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-900">
              🌟 Поделитесь своим успехом!
            </p>
            
            <div className="space-y-2">
              <Button 
                onClick={shareToInstagram}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Instagram size={18} className="mr-2" />
                Поделиться в Instagram Stories
              </Button>
              
              <Button 
                onClick={copyToClipboard}
                variant="outline" 
                className="w-full bg-white/20 border-amber-300 text-amber-900 hover:bg-white/30"
              >
                <Share2 size={18} className="mr-2" />
                Скопировать для других соцсетей
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="sm"
            className="absolute top-4 right-4 text-amber-800 hover:bg-white/20"
          >
            <X size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}