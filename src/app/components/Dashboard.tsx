import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExamCard } from "./ExamCard";
import { Activity, FileText, Users, TrendingUp, Upload, LogOut, ChevronLeft, ChevronRight, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = [
    {
      title: "Total de Exames",
      value: "48",
      icon: FileText,
      trend: "+12% este mês",
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "Membros da Família",
      value: "4",
      icon: Users,
      trend: "Ativos",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Processando",
      value: "3",
      icon: Activity,
      trend: "Aguardando",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Última Atualização",
      value: "Hoje",
      icon: TrendingUp,
      trend: "15/11/2025",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const allExams = [
    { examName: "Glicemia em Jejum", value: 95, unit: "mg/dL", trend: "stable" as const, referenceRange: "70-99 mg/dL", date: "15/11/2025", familyMember: "João Silva" },
    { examName: "Colesterol Total", value: 185, unit: "mg/dL", trend: "down" as const, referenceRange: "<200 mg/dL", date: "14/11/2025", familyMember: "Maria Silva" },
    { examName: "Hemoglobina", value: 14.2, unit: "g/dL", trend: "stable" as const, referenceRange: "12-16 g/dL", date: "13/11/2025", familyMember: "Pedro Silva" },
    { examName: "TSH", value: 2.5, unit: "mUI/L", trend: "up" as const, referenceRange: "0.4-4.0 mUI/L", date: "12/11/2025", familyMember: "Ana Silva" },
    { examName: "Creatinina", value: 0.9, unit: "mg/dL", trend: "stable" as const, referenceRange: "0.7-1.3 mg/dL", date: "11/11/2025", familyMember: "João Silva" },
    { examName: "LDL Colesterol", value: 110, unit: "mg/dL", trend: "down" as const, referenceRange: "<130 mg/dL", date: "10/11/2025", familyMember: "Maria Silva" },
    { examName: "Leucócitos", value: 7200, unit: "/mm³", trend: "stable" as const, referenceRange: "4000-11000 /mm³", date: "09/11/2025", familyMember: "Pedro Silva" },
    { examName: "Vitamina D", value: 32, unit: "ng/mL", trend: "up" as const, referenceRange: "30-100 ng/mL", date: "08/11/2025", familyMember: "Ana Silva" },
    { examName: "TGO/AST", value: 28, unit: "U/L", trend: "stable" as const, referenceRange: "<40 U/L", date: "07/11/2025", familyMember: "João Silva" },
    { examName: "Triglicerídeos", value: 140, unit: "mg/dL", trend: "down" as const, referenceRange: "<150 mg/dL", date: "06/11/2025", familyMember: "Maria Silva" },
    { examName: "Plaquetas", value: 245000, unit: "/mm³", trend: "stable" as const, referenceRange: "150000-400000 /mm³", date: "05/11/2025", familyMember: "Pedro Silva" },
    { examName: "T4 Livre", value: 1.2, unit: "ng/dL", trend: "stable" as const, referenceRange: "0.8-1.8 ng/dL", date: "04/11/2025", familyMember: "Ana Silva" },
    { examName: "Ureia", value: 35, unit: "mg/dL", trend: "stable" as const, referenceRange: "15-45 mg/dL", date: "03/11/2025", familyMember: "João Silva" },
    { examName: "HDL Colesterol", value: 55, unit: "mg/dL", trend: "up" as const, referenceRange: ">40 mg/dL", date: "02/11/2025", familyMember: "Maria Silva" },
    { examName: "Hemácias", value: 4.8, unit: "milhões/mm³", trend: "stable" as const, referenceRange: "4.5-5.5 milhões/mm³", date: "01/11/2025", familyMember: "Pedro Silva" },
  ];

  const totalPages = Math.ceil(allExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = allExams.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

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
                className="text-teal-700 hover:bg-teal-50"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/exam-management")}
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
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
                variant="outline"
                onClick={() => navigate("/family")}
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Gerenciar Família
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
          {/* Welcome Section */}
          <div>
            <h1 className="text-teal-900 mb-2">Bem-vindo, João!</h1>
            <p className="text-slate-600">Aqui está um resumo dos exames da sua família</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-teal-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-slate-600">{stat.title}</p>
                        <p className="text-teal-900">{stat.value}</p>
                        <p className="text-slate-500">{stat.trend}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle className="text-teal-900">Ações Rápidas</CardTitle>
              <CardDescription>Gerencie seus exames facilmente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate("/exam-management")}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Novo Exame
                </Button>
                <Button 
                  onClick={() => navigate("/my-results")}
                  variant="outline"
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Todos os Resultados
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exams */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-teal-900">Exames Recentes</h2>
                <p className="text-slate-600">Últimos resultados da sua família ({allExams.length} total)</p>
              </div>
              <Button 
                onClick={() => navigate("/my-results")}
                variant="outline"
                className="border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Ver Todos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
              {currentExams.map((exam, index) => (
                <ExamCard key={startIndex + index} {...exam} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-slate-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, allExams.length)} de {allExams.length} exames
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <span className="text-slate-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="border-teal-200 text-teal-700 hover:bg-teal-50 disabled:opacity-50"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}