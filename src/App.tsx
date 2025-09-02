import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BottomNavigation } from "@/components/ui/navigation";
import { useAuth } from "@/hooks/useAuth";

// Импортируем все страницы
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Pricing from "./pages/Pricing";
import Shop from "./pages/Shop";
import Scanner from "./pages/Scanner";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Themes from "./pages/Themes";
import Schedule from "./pages/Schedule";
import Workout from "./pages/Workout";
import Breathing from "./pages/Breathing";
import NotFound from "./pages/NotFound";

function AppContent() {
  const { user, loading, onboardingDone, subscriptionTier } = useAuth();

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('App routing debug:', {
      user: user?.id,
      onboardingDone,
      subscriptionTier,
      loading
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          {user ? (
            <>
              {/* Авторизованные пользователи */}
              <Route
                path="/"
                element={
                  onboardingDone
                    ? (subscriptionTier ? <Navigate to="/dashboard" replace /> : <Navigate to="/pricing" replace />)
                    : <Navigate to="/onboarding" replace />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/themes" element={<Themes />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/breathing" element={<Breathing />} />
            </>
          ) : (
            <>
              {/* Неавторизованные пользователи */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Показываем нижнюю навигацию только для авторизованных пользователей */}
        {user && <BottomNavigation />}
      </div>
    </BrowserRouter>
  );
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AppContent />
  </TooltipProvider>
);

export default App;