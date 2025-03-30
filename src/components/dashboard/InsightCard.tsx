
import { AlertCircle, Check, RefreshCw, RotateCcw, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertSeverity, ActionType } from "@/data/mockData";
import { toast } from "sonner";

interface InsightCardProps {
  title: string;
  description: string;
  deviceCount: number;
  recommendedAction: string;
  actionType: ActionType;
  severity: AlertSeverity;
  className?: string;
}

export const InsightCard = ({
  title,
  description,
  deviceCount,
  recommendedAction,
  actionType,
  severity,
  className,
}: InsightCardProps) => {
  // Map severity to colors and icon
  const severityMap = {
    critical: {
      color: "bg-red-100 text-red-800 border-red-200",
      badge: "bg-red-500 hover:bg-red-600",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    },
    high: {
      color: "bg-orange-100 text-orange-800 border-orange-200",
      badge: "bg-orange-500 hover:bg-orange-600",
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
    },
    medium: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      badge: "bg-yellow-500 hover:bg-yellow-600",
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    },
    low: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      badge: "bg-blue-500 hover:bg-blue-600",
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
    },
  };

  // Map action type to icon
  const actionMap = {
    restart: <RotateCcw className="mr-2 h-4 w-4" />,
    update: <RefreshCw className="mr-2 h-4 w-4" />,
    reinstall: <RotateCcw className="mr-2 h-4 w-4" />,
    notify: <Send className="mr-2 h-4 w-4" />,
  };

  const handleAction = () => {
    toast.success(`Action initiated: ${recommendedAction}`, {
      description: `For ${deviceCount} affected devices`,
    });
  };
  
  return (
    <div className={cn(
      "rounded-lg border p-4",
      severityMap[severity].color,
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="mt-1">{severityMap[severity].icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{title}</h3>
            <Badge variant="outline" className="ml-2">
              {deviceCount} {deviceCount === 1 ? "device" : "devices"}
            </Badge>
          </div>
          <p className="text-sm mt-2">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <Button 
              size="sm"
              variant="secondary"
              className={cn("text-xs", severityMap[severity].badge)}
              onClick={handleAction}
            >
              {actionMap[actionType]}
              {recommendedAction}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs"
              onClick={() => toast.success("Marked as resolved")}
            >
              <Check className="mr-2 h-3 w-3" /> 
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
