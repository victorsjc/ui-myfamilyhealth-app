import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";

interface RequestCardProps {
  id: string;
  fileName: string;
  requestDate: string;
  requestTime: string;
  requester: string;
  status: "processing" | "success" | "error" | "analyzing";
  onViewDetails: () => void;
}

export function RequestCard({ 
  id,
  fileName,
  requestDate, 
  requestTime, 
  requester, 
  status,
  onViewDetails
}: RequestCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "processing":
        return {
          label: "Em Processamento",
          icon: Clock,
          color: "bg-blue-100 text-blue-700 border-blue-200",
          iconColor: "text-blue-600"
        };
      case "success":
        return {
          label: "Processado com Sucesso",
          icon: CheckCircle,
          color: "bg-green-100 text-green-700 border-green-200",
          iconColor: "text-green-600"
        };
      case "error":
        return {
          label: "Processado com Falha",
          icon: XCircle,
          color: "bg-red-100 text-red-700 border-red-200",
          iconColor: "text-red-600"
        };
      case "analyzing":
        return {
          label: "Em Análise",
          icon: AlertCircle,
          color: "bg-amber-100 text-amber-700 border-amber-200",
          iconColor: "text-amber-600"
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border-teal-100 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            
            <div className="space-y-3 flex-1 min-w-0">
              <div>
                <h4 className="text-teal-900 truncate">{fileName}</h4>
                <p className="text-slate-500">ID: {id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-500">Data/Hora</p>
                  <p className="text-slate-700">{requestDate} às {requestTime}</p>
                </div>
                <div>
                  <p className="text-slate-500">Solicitante</p>
                  <p className="text-slate-700">{requester}</p>
                </div>
              </div>

              <Badge className={statusConfig.color}>
                <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.iconColor}`} />
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewDetails}
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <Eye className="w-4 h-4 mr-1" />
              Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
