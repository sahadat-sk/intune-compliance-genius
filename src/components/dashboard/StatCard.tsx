
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 shadow-sm border border-gray-100",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <span className="text-dashboard-purple">{icon}</span>}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        )}
      </div>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
};
