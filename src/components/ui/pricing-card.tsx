import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Check } from "lucide-react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  subtitle?: string;
  price?: string;
  originalPrice?: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
  className?: string;
  onPurchase?: () => void;
  disabled?: boolean;
}

export function PricingCard({
  title,
  subtitle,
  price,
  originalPrice,
  features,
  buttonText,
  isPopular,
  className,
  onPurchase,
  disabled
}: PricingCardProps) {
  return (
    <div className={cn(
      "bg-dark-surface rounded-xl p-6 border border-border space-y-6",
      "shadow-[var(--shadow-card)] relative overflow-hidden",
      isPopular && "border-primary/30",
      className
    )}>
      {isPopular && (
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-primary uppercase">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        
        {price && (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={cn(
              "flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center",
              feature.included 
                ? "bg-primary border-primary" 
                : "border-muted-foreground/30"
            )}>
              {feature.included && (
                <Check size={12} className="text-primary-foreground" />
              )}
            </div>
            <span className={cn(
              "text-sm",
              feature.included ? "text-foreground" : "text-muted-foreground"
            )}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Button 
        className="w-full h-12 text-sm font-semibold"
        variant={isPopular ? "default" : "outline"}
        onClick={onPurchase}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
}