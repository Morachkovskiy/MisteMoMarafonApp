import { cn } from "@/lib/utils";
import { Button } from "./button";

interface QuestionnaireOption {
  id: string;
  label: string;
  isHighlighted?: boolean;
}

interface QuestionnaireCardProps {
  question: string;
  options: QuestionnaireOption[];
  selectedOption?: string;
  onOptionSelect?: (optionId: string) => void;
  className?: string;
}

export function QuestionnaireCard({
  question,
  options,
  selectedOption,
  onOptionSelect,
  className
}: QuestionnaireCardProps) {
  return (
    <div className={cn(
      "bg-dark-surface rounded-xl p-4 border border-border space-y-4",
      "shadow-[var(--shadow-card)]",
      className
    )}>
      <h3 className="text-sm font-medium text-foreground">{question}</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={selectedOption === option.id ? "default" : "outline"}
            size="sm"
            onClick={() => onOptionSelect?.(option.id)}
            className={cn(
              "h-auto py-3 px-4 text-xs font-medium transition-all duration-300",
              option.isHighlighted && selectedOption !== option.id && 
                "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
              selectedOption === option.id && "bg-primary text-primary-foreground"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}