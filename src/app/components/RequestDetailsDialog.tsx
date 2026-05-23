import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle, Clock, XCircle, RefreshCw, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RequestDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    id: string;
    fileName: string;
    requestDate: string;
    requestTime: string;
    requester: string;
    status: "processing" | "success" | "error" | "analyzing";
    collectionDate?: string;
    collectionTime?: string;
    errorDetails?: string;
  };
}

export function RequestDetailsDialog({ open, onOpenChange, request }: RequestDetailsDialogProps) {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (request.status) {
      case "processing":
        return {
          label: "Em Processamento",
          icon: Clock,
          color: "bg-blue-100 text-blue-700 border-blue-200",
          iconColor: "text-blue-600",
          description: "O documento está sendo processado. Isso pode levar alguns minutos."
        };
      case "success":
        return {
          label: "Processado com Sucesso",
          icon: CheckCircle,
          color: "bg-green-100 text-green-700 border-green-200",
          iconColor: "text-green-600",
          description: "O documento foi processado com sucesso e os resultados estão disponíveis."
        };
      case "error":
        return {
          label: "Processado com Falha",
          icon: XCircle,
          color: "bg-red-100 text-red-700 border-red-200",
          iconColor: "text-red-600",
          description: "Houve um erro ao processar o documento."
        };
      case "analyzing":
        return {
          label: "Em Análise",
          icon: AlertCircle,
          color: "bg-amber-100 text-amber-700 border-amber-200",
          iconColor: "text-amber-600",
          description: "O documento foi processado e está sendo analisado pela equipe técnica."
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const handleRequestReanalysis = () => {
    alert("Solicitação de reanálise enviada ao Suporte Técnico. Você receberá uma resposta em até 5 dias úteis.");
    onOpenChange(false);
  };

  const handleViewResults = () => {
    // Navegar para Meus Resultados com filtro de data/hora
    navigate(`/my-results?collectionDate=${request.collectionDate}&collectionTime=${request.collectionTime}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-teal-900">Detalhes da Solicitação</DialogTitle>
          <DialogDescription>
            Informações completas sobre o processamento do documento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <Badge className={`${statusConfig.color} px-4 py-2`}>
              <StatusIcon className={`w-5 h-5 mr-2 ${statusConfig.iconColor}`} />
              {statusConfig.label}
            </Badge>
          </div>

          {/* Status Description */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-slate-700">{statusConfig.description}</p>
          </div>

          {/* Request Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500">ID da Solicitação</p>
                <p className="text-slate-900">{request.id}</p>
              </div>
              <div>
                <p className="text-slate-500">Nome do Arquivo</p>
                <p className="text-slate-900">{request.fileName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-500">Data da Solicitação</p>
                <p className="text-slate-900">{request.requestDate} às {request.requestTime}</p>
              </div>
              <div>
                <p className="text-slate-500">Solicitante</p>
                <p className="text-slate-900">{request.requester}</p>
              </div>
            </div>

            {request.collectionDate && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500">Data da Coleta</p>
                  <p className="text-slate-900">{request.collectionDate} às {request.collectionTime}</p>
                </div>
              </div>
            )}
          </div>

          {/* Error Details */}
          {request.status === "error" && request.errorDetails && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-red-900">Detalhes do Erro</h4>
                  <p className="text-red-700">{request.errorDetails}</p>
                  <ul className="list-disc list-inside text-red-600 space-y-1">
                    <li>Verifique se o arquivo é um PDF válido</li>
                    <li>Certifique-se de que o documento está legível</li>
                    <li>O arquivo deve conter informações médicas em formato padrão</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Success Information */}
          {request.status === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-green-900">Processamento Concluído</h4>
                  <p className="text-green-700">
                    Todos os dados foram extraídos com sucesso. Você pode visualizar os resultados agora.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {request.status === "error" && (
            <Button
              onClick={handleRequestReanalysis}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Solicitar Reanálise
            </Button>
          )}
          
          {request.status === "success" && (
            <Button
              onClick={handleViewResults}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Resultados
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
