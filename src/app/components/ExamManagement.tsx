import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RequestCard } from "./RequestCard";
import { RequestDetailsDialog } from "./RequestDetailsDialog";
import { Activity, Upload, FileText, Filter, LogOut, Bot, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ExamManagement() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const requests = [
    {
      id: "REQ-001",
      fileName: "Hemograma_Completo_João.pdf",
      requestDate: "15/11/2025",
      requestTime: "10:30",
      requester: "João Silva",
      status: "processing" as const,
      collectionDate: "15/11/2025",
      collectionTime: "08:00"
    },
    {
      id: "REQ-002",
      fileName: "Exames_Cardiológicos_Maria.pdf",
      requestDate: "15/11/2025",
      requestTime: "09:15",
      requester: "Maria Silva",
      status: "success" as const,
      collectionDate: "14/11/2025",
      collectionTime: "14:30"
    },
    {
      id: "REQ-003",
      fileName: "Análise_Hormonal_Ana.pdf",
      requestDate: "14/11/2025",
      requestTime: "16:45",
      requester: "Ana Silva",
      status: "analyzing" as const,
      collectionDate: "13/11/2025",
      collectionTime: "09:00"
    },
    {
      id: "REQ-004",
      fileName: "Colesterol_Pedro.pdf",
      requestDate: "14/11/2025",
      requestTime: "14:20",
      requester: "Pedro Silva",
      status: "success" as const,
      collectionDate: "13/11/2025",
      collectionTime: "11:15"
    },
    {
      id: "REQ-005",
      fileName: "Raio_X_Torax_João.pdf",
      requestDate: "13/11/2025",
      requestTime: "11:00",
      requester: "João Silva",
      status: "error" as const,
      collectionDate: "12/11/2025",
      collectionTime: "16:00",
      errorDetails: "Documento inválido: O arquivo não contém informações médicas reconhecíveis. Por favor, verifique se o PDF está correto e não está corrompido."
    },
    {
      id: "REQ-006",
      fileName: "Ultrassom_Abdominal_Maria.pdf",
      requestDate: "12/11/2025",
      requestTime: "15:30",
      requester: "Maria Silva",
      status: "success" as const,
      collectionDate: "11/11/2025",
      collectionTime: "10:00"
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      alert(`Arquivo "${file.name}" enviado com sucesso para processamento!`);
      setFile(null);
    }
  };

  const filteredRequests = filterStatus === "all" 
    ? requests 
    : requests.filter(req => req.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b border-teal-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-teal-900">MinhaSaudeFamiliar</span>
            </div>
            
            <nav className="flex items-center gap-4">
              <Button 
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/exam-management")}
                className="text-teal-700 hover:bg-teal-50"
              >
                Gestão de Exames
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/my-results")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                Meus Resultados
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/family")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                <Users className="w-4 h-4 mr-2" />
                Família
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/chatbot")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                <Bot className="w-4 h-4 mr-2" />
                Autoajuda
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/support")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                Suporte
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-teal-900 mb-2">Gestão de Exames</h1>
            <p className="text-slate-600">Envie e acompanhe o processamento dos seus exames médicos</p>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="bg-white border border-teal-100">
              <TabsTrigger value="upload" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                <Upload className="w-4 h-4 mr-2" />
                Enviar Exame
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                <FileText className="w-4 h-4 mr-2" />
                Solicitações ({requests.length})
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <Card className="border-teal-100">
                <CardHeader>
                  <CardTitle className="text-teal-900">Enviar Novo Exame</CardTitle>
                  <CardDescription>
                    Faça upload de documentos PDF para processamento automático
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="member">Membro da Família</Label>
                        <Select>
                          <SelectTrigger id="member" className="border-teal-100">
                            <SelectValue placeholder="Selecione o membro" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="joao">João Silva</SelectItem>
                            <SelectItem value="maria">Maria Silva</SelectItem>
                            <SelectItem value="pedro">Pedro Silva</SelectItem>
                            <SelectItem value="ana">Ana Silva</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="exam-type">Tipo de Exame</Label>
                        <Select>
                          <SelectTrigger id="exam-type" className="border-teal-100">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blood">Exame de Sangue</SelectItem>
                            <SelectItem value="image">Exame de Imagem</SelectItem>
                            <SelectItem value="urine">Exame de Urina</SelectItem>
                            <SelectItem value="cardio">Exame Cardiológico</SelectItem>
                            <SelectItem value="other">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Arquivo PDF</Label>
                      <div className="flex gap-4">
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="border-teal-100 flex-1"
                        />
                      </div>
                      {file && (
                        <p className="text-slate-600">
                          Arquivo selecionado: {file.name}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="submit"
                        disabled={!file}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Enviar para Processamento
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFile(null)}
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                      >
                        Limpar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="border-teal-100 bg-teal-50/50">
                <CardContent className="p-6">
                  <h4 className="text-teal-900 mb-2">Informações Importantes</h4>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Aceita apenas arquivos em formato PDF</li>
                    <li>• O processamento pode levar de 5 a 15 minutos</li>
                    <li>• Você será notificado quando o processamento for concluído</li>
                    <li>• Certifique-se de que o documento está legível</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests">
              <Card className="border-teal-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-teal-900">Solicitações de Processamento</CardTitle>
                      <CardDescription>
                        Acompanhe o status de todos os documentos enviados
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-teal-600" />
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-48 border-teal-100">
                          <SelectValue placeholder="Filtrar por status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="processing">Em Processamento</SelectItem>
                          <SelectItem value="success">Processado com Sucesso</SelectItem>
                          <SelectItem value="error">Processado com Falha</SelectItem>
                          <SelectItem value="analyzing">Em Análise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <RequestCard 
                          key={request.id} 
                          {...request}
                          onViewDetails={() => {
                            setSelectedRequest(request);
                            setDetailsOpen(true);
                          }}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          Nenhuma solicitação encontrada com este filtro
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <RequestDetailsDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          request={selectedRequest}
        />
      )}
    </div>
  );
}