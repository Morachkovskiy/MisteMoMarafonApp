import { useState } from "react";
import { Camera, Upload, ArrowLeft, CheckCircle2, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


interface ScanResult {
  name: string;
  weight: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export default function Scanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Демо данные для тестирования UI
  const mockScanResults: ScanResult[] = [
    { name: "Куриная грудка", weight: 150, calories: 248, protein: 46, fat: 5, carbs: 0 },
    { name: "Брокколи", weight: 100, calories: 34, protein: 3, fat: 0, carbs: 7 },
    { name: "Рис", weight: 80, calories: 288, protein: 6, fat: 1, carbs: 64 }
  ];

  const handleScan = async () => {
    setIsProcessing(true);
    
    // Имитация процесса сканирования
    setTimeout(() => {
      setScanResults(mockScanResults);
      setIsProcessing(false);
      toast.success("Продукты успешно распознаны!");
    }, 3000);
  };

  const handleUpload = async () => {
    // Открытие галереи (пока заглушка)
    toast.info("Функция загрузки из галереи будет добавлена");
  };

  const updateWeight = (index: number, newWeight: number) => {
    const updated = [...scanResults];
    const item = updated[index];
    const ratio = newWeight / item.weight;
    
    updated[index] = {
      ...item,
      weight: newWeight,
      calories: Math.round(item.calories * ratio),
      protein: Math.round(item.protein * ratio * 10) / 10,
      fat: Math.round(item.fat * ratio * 10) / 10,
      carbs: Math.round(item.carbs * ratio * 10) / 10,
    };
    
    setScanResults(updated);
  };

  const removeItem = (index: number) => {
    setScanResults(scanResults.filter((_, i) => i !== index));
  };

  const getTotalCalories = () => {
    return scanResults.reduce((total, item) => total + item.calories, 0);
  };

  const getTotalNutrients = () => {
    return scanResults.reduce(
      (totals, item) => ({
        protein: totals.protein + item.protein,
        fat: totals.fat + item.fat,
        carbs: totals.carbs + item.carbs,
      }),
      { protein: 0, fat: 0, carbs: 0 }
    );
  };

  const saveToDiary = () => {
    // Сохранение в наш API
    toast.success("Данные сохранены в дневник питания!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-black hover:bg-black/10 p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
            <Camera size={20} className="text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">Сканер еды</h1>
            <p className="text-sm text-black/80">Определение калорий и КБЖУ</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Club Membership - Станьте частью клуба MisterMo */}
        <Card className="bg-dark-surface p-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Станьте частью клуба MisterMo
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/01943daa-db09-4dcb-a70c-9df8145da00e.png" 
                  alt="Сканер еды"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/scanner')}
                >
                  Сканер еды
                </Button>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/90313f9c-2509-4cfa-a9b3-60432ef88b82.png" 
                  alt="Группа поддержки"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/chat')}
                >
                  Группа поддержки
                </Button>
              </div>
            </div>
            <div className="relative h-24 overflow-hidden rounded-lg">
              <div className="absolute inset-0">
                <img 
                  src="/lovable-uploads/26f342d5-a3af-463a-9172-28bd4aafec13.png" 
                  alt="Фитнес и фейсбилдинг"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 right-1 z-10">
                <Button 
                  size="sm" 
                  className="w-full text-[8px] bg-primary text-black font-semibold hover:bg-primary/90 h-6"
                  onClick={() => navigate('/workout')}
                >
                  Фитнес и фейсбилдинг
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Scanning Interface */}
        {scanResults.length === 0 && (
          <>
            <Card className="bg-dark-surface p-6 text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Camera size={48} className="text-primary" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Умный сканер еды</h2>
                <p className="text-sm text-muted-foreground">
                  Сфотографируйте вашу еду и получите точные данные о калориях и питательных веществах
                </p>
              </div>

              {isProcessing ? (
                <div className="space-y-4">
                  <div className="w-8 h-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Анализируем изображение...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleScan}
                    className="flex flex-col gap-2 h-auto py-6 bg-primary text-black hover:bg-primary/90"
                  >
                    <Camera size={24} />
                    <span>Сканировать</span>
                  </Button>
                  <Button 
                    onClick={handleUpload}
                    variant="outline" 
                    className="flex flex-col gap-2 h-auto py-6"
                  >
                    <Upload size={24} />
                    <span>Загрузить фото</span>
                  </Button>
                </div>
              )}
            </Card>

            {/* Info Card */}
            <Card className="bg-dark-surface p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Как это работает?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>1. Сфотографируйте вашу еду или загрузите фото из галереи</p>
                <p>2. AI определит продукты и их примерный вес</p>
                <p>3. Просмотрите результат и при необходимости откорректируйте</p>
                <p>4. Сохраните данные в дневник питания</p>
              </div>
            </Card>
          </>
        )}

        {/* Scan Results */}
        {scanResults.length > 0 && (
          <>
            <Card className="bg-dark-surface p-4 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-500" />
                <h3 className="font-semibold text-foreground">Результаты сканирования</h3>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Проверьте распознанные продукты и при необходимости откорректируйте вес
              </p>
            </Card>

            {/* Products List */}
            <div className="space-y-3">
              {scanResults.map((item, index) => (
                <Card key={index} className="bg-dark-surface p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">Вес (г)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={item.weight}
                          onChange={(e) => updateWeight(index, Number(e.target.value))}
                          className="h-8"
                        />
                        <Edit3 size={16} className="text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Калории</p>
                      <p className="font-semibold text-primary">{item.calories} ккал</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div className="text-center">
                      <p className="text-muted-foreground">Белки</p>
                      <p className="font-medium">{item.protein}г</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Жиры</p>
                      <p className="font-medium">{item.fat}г</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Углеводы</p>
                      <p className="font-medium">{item.carbs}г</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Total Summary */}
            <Card className="bg-primary/5 border-primary/20 p-4">
              <h3 className="font-semibold text-foreground mb-3">Итого за прием пищи</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{getTotalCalories()}</p>
                  <p className="text-sm text-muted-foreground">ккал</p>
                </div>
                
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <p className="font-medium">{getTotalNutrients().protein.toFixed(1)}г</p>
                    <p className="text-muted-foreground">Белки</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{getTotalNutrients().fat.toFixed(1)}г</p>
                    <p className="text-muted-foreground">Жиры</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{getTotalNutrients().carbs.toFixed(1)}г</p>
                    <p className="text-muted-foreground">Углеводы</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => setScanResults([])}
                className="h-12"
              >
                Отмена
              </Button>
              <Button 
                onClick={saveToDiary}
                className="h-12 bg-primary text-black hover:bg-primary/90"
              >
                Сохранить в дневник
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}