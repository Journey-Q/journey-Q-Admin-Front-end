import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsWidgetProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  description?: string;
  className?: string;
}

export const StatsWidget = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  description,
  className 
}: StatsWidgetProps) => {
  return (
    <Card className={cn("dashboard-widget", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mb-1">
            {value}
          </p>
          {change && (
            <p className={cn(
              "text-sm font-medium",
              changeType === 'positive' && "text-success",
              changeType === 'negative' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 ml-4">
          <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};