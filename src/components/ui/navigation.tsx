import { cn } from "@/lib/utils";
import { Home, ShoppingBag, QrCode, MessageCircle, User, Calendar } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Главная", path: "/" },
  { icon: ShoppingBag, label: "Магазин", path: "/shop" },
  { icon: QrCode, label: "Сканер", path: "/scanner", highlight: true },
  { icon: MessageCircle, label: "Чат", path: "/chat" },
  { icon: User, label: "Профиль", path: "/profile" },
];

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => {
                if (item.label === "Магазин") {
                  window.open("https://mistermo.kz", "_blank");
                } else {
                  navigate(item.path);
                }
              }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-0 flex-1",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                item.highlight && !isActive && "bg-primary/10"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                item.highlight && !isActive && "bg-primary text-primary-foreground",
                item.highlight && isActive && "bg-primary text-primary-foreground scale-110"
              )}>
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}