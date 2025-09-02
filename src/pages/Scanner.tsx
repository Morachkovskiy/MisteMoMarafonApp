import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useDailyProgress } from "@/hooks/useDailyProgress";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, ArrowLeft, Save, Zap } from "lucide-react";

export default function Scanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProgress } = useDailyProgress();
  const { toast } = useToast();
  
  const [scanning, setScanning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [foodData, setFoodData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    weight: ''
  });

  const handleScan = async () => {
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Пользователь не авторизован",
        variant: "destructive"
      });
      return;
    }

    setScanning(true);
    
    try {
      // Имитация сканирования (в реальном приложении здесь будет AI анализ фото)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Заполняем примерными данными
      setFoodData({
        name: 'Яблоко',
        calories: '52',
        protein: '0.3',
        carbs: '14',
        fat: '0.2',
        weight: '150'
      });
      
      toast({
        title: "Сканирование завершено!",
        description: "Продукт распознан как яблоко"
      });
      
    } catch (error) {
      toast({
        title: "Ошибка сканирования",
        description: "Не удалось распознать продукт",
        variant: "destructive"
      });
    } finally {
      setScanning(false);
    }
  };

  const handleUpload = async () => {
    if (!user) {
      toast({
        title: "Ошибка",
        description: "Пользователь не авторизован",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // Имитация загрузки фото
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Заполняем примерными данными
      setFoodData({
        name: 'Банан',
        calories: '89',
        protein: '1.1',
        carbs: '23',
        fat: '0.3',
        weight: '120'
      });
      
      toast({
        title: "Фото загружено!",
        description: "Продукт распознан как банан"
      });
      
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить фото",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const saveToDiary = async () => {
    if (!user || !foodData.calories || !foodData.weight) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      const calories = parseFloat(foodData.calories);
      const weight = parseFloat(foodData.weight);
      
      // Обновляем прогресс
      await updateProgress({
        calories_consumed: calories,
        weight: weight
      });
      
      toast({
        title: "Успешно!",
        description: "Данные сохранены в дневник питания"
      });
      
      navigate("/dashboard");
      
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFoodData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-white">Сканер еды</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
            <Camera size={32} className="text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Определите калории и КБЖУ
          </h2>
          <p className="text-white/80 text-sm">
            Сканируйте или загружайте фото продуктов
          </p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Scan Options */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleScan}
            disabled={scanning}
            className="h-20 bg-gradient-to-r from-green-500 to-teal-600 text-white"
          >
            <div className="text-center">
              <Camera size={24} className="mx-auto mb-2" />
              <span className="text-sm font-medium">
                {scanning ? "Сканирую..." : "Сканировать"}
              </span>
            </div>
          </Button>
          
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="h-20 bg-gradient-to-r from-purple-500 to-pink-600 text-white"
          >
            <div className="text-center">
              <Upload size={24} className="mx-auto mb-2" />
              <span className="text-sm font-medium">
                {uploading ? "Загружаю..." : "Загрузить фото"}
              </span>
            </div>
          </Button>
        </div>

        {/* Manual Input Toggle */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Ручной ввод</h3>
              <p className="text-sm text-muted-foreground">
                Введите данные о продукте вручную
              </p>
            </div>
            <Button
              variant={manualMode ? "default" : "outline"}
              size="sm"
              onClick={() => setManualMode(!manualMode)}
            >
              {manualMode ? "Скрыть" : "Показать"}
            </Button>
          </div>
        </Card>

        {/* Food Data Form */}
        {manualMode && (
          <Card className="bg-dark-surface p-4 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Информация о продукте</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название продукта</Label>
                <Input
                  id="name"
                  value={foodData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Например: Яблоко"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calories">Калории *</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={foodData.calories}
                    onChange={(e) => handleInputChange('calories', e.target.value)}
                    placeholder="52"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">Вес (г) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={foodData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="150"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="protein">Белки (г)</Label>
                  <Input
                    id="protein"
                    type="number"
                    step="0.1"
                    value={foodData.protein}
                    onChange={(e) => handleInputChange('protein', e.target.value)}
                    placeholder="0.3"
                  />
                </div>
                
                <div>
                  <Label htmlFor="carbs">Углеводы (г)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    step="0.1"
                    value={foodData.carbs}
                    onChange={(e) => handleInputChange('carbs', e.target.value)}
                    placeholder="14"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fat">Жиры (г)</Label>
                  <Input
                    id="fat"
                    type="number"
                    step="0.1"
                    value={foodData.fat}
                    onChange={(e) => handleInputChange('fat', e.target.value)}
                    placeholder="0.2"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Food Summary */}
        {(foodData.name || foodData.calories) && (
          <Card className="bg-dark-surface p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Результат анализа</h3>
            
            <div className="space-y-3">
              {foodData.name && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Продукт:</span>
                  <span className="font-medium text-foreground">{foodData.name}</span>
                </div>
              )}
              
              {foodData.calories && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Калории:</span>
                  <span className="font-bold text-primary">{foodData.calories} ккал</span>
                </div>
              )}
              
              {foodData.weight && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Вес:</span>
                  <span className="font-medium text-foreground">{foodData.weight} г</span>
                </div>
              )}
              
              {(foodData.protein || foodData.carbs || foodData.fat) && (
                <div className="pt-3 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Белки</div>
                      <div className="font-medium text-foreground">{foodData.protein || '0'} г</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Углеводы</div>
                      <div className="font-medium text-foreground">{foodData.carbs || '0'} г</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Жиры</div>
                      <div className="font-medium text-foreground">{foodData.fat || '0'} г</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Save Button */}
        {(foodData.calories && foodData.weight) && (
          <Button 
            onClick={saveToDiary}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-600"
          >
            <Save size={20} className="mr-2" />
            Сохранить в дневник
          </Button>
        )}

        {/* AI Chat Suggestion */}
        <Card className="bg-dark-surface p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Нужна помощь?</h3>
              <p className="text-sm text-muted-foreground">
                Спросите AI о питании и здоровье
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/chat')}
            >
              Чат
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}