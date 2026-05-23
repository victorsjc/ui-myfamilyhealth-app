import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";

interface ExamCardProps {
  examName: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  referenceRange?: string;
  date: string;
  familyMember?: string;
}

export function ExamCard({ 
  examName, 
  value, 
  unit, 
  trend, 
  referenceRange,
  date,
  familyMember 
}: ExamCardProps) {
  const [showHistory, setShowHistory] = useState(false);

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4" />;
      case "down":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-red-600";
      case "down":
        return "text-green-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <Card className="border-teal-100 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h4 className="text-teal-900">{examName}</h4>
            {familyMember && (
              <Badge variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
                {familyMember}
              </Badge>
            )}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              {getTrendIcon()}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-teal-900">
              {value}
            </span>
            {unit && <span className="text-slate-600">{unit}</span>}
          </div>
          {referenceRange && (
            <p className="text-slate-500">
              Referência: {referenceRange}
            </p>
          )}
          <p className="text-slate-500">
            {date}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-teal-50">
          <label htmlFor={`history-${examName}`} className="text-slate-700 cursor-pointer">
            Ver histórico
          </label>
          <Switch
            id={`history-${examName}`}
            checked={showHistory}
            onCheckedChange={setShowHistory}
            className="data-[state=checked]:bg-teal-600"
          />
        </div>

        {showHistory && (
          <div className="pt-2 space-y-2 border-t border-teal-50">
            <p className="text-slate-600">Histórico dos últimos 6 meses:</p>
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Out/2024</span>
                <span>{typeof value === 'number' ? value - 2 : value} {unit}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Set/2024</span>
                <span>{typeof value === 'number' ? value - 5 : value} {unit}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ago/2024</span>
                <span>{typeof value === 'number' ? value - 3 : value} {unit}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50">
              Ver Histórico Completo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
