import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ExamCard } from "./ExamCard";
import { Activity, Search, Filter, Download, LogOut, ChevronLeft, ChevronRight, Calendar, Bot } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Users } from "lucide-react";

export function MyResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMember, setFilterMember] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDate, setFilterDate] = useState(() => {
    // Pega data da URL ou usa data atual
    return searchParams.get("collectionDate") || new Date().toISOString().split('T')[0];
  });
  const [filterTime, setFilterTime] = useState(() => {
    return searchParams.get("collectionTime") || "";
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Hoje como data padrão
  const todayDate = new Date().toISOString().split('T')[0];

  const exams = [
    {
      examName: "Glicemia em Jejum",
      value: 95,
      unit: "mg/dL",
      trend: "stable" as const,
      referenceRange: "70-99 mg/dL",
      date: "15/11/2025",
      collectionDate: "2025-11-15",
      collectionTime: "08:00",
      familyMember: "João Silva",
      category: "Bioquímica"
    },
    {
      examName: "Colesterol Total",
      value: 185,
      unit: "mg/dL",
      trend: "down" as const,
      referenceRange: "<200 mg/dL",
      date: "14/11/2025",
      collectionDate: "2025-11-14",
      collectionTime: "14:30",
      familyMember: "Maria Silva",
      category: "Lipidograma"
    },
    {
      examName: "Hemoglobina",
      value: 14.2,
      unit: "g/dL",
      trend: "stable" as const,
      referenceRange: "12-16 g/dL",
      date: "13/11/2025",
      collectionDate: "2025-11-13",
      collectionTime: "09:00",
      familyMember: "Pedro Silva",
      category: "Hemograma"
    },
    {
      examName: "TSH",
      value: 2.5,
      unit: "mUI/L",
      trend: "up" as const,
      referenceRange: "0.4-4.0 mUI/L",
      date: "12/11/2025",
      collectionDate: "2025-11-12",
      collectionTime: "16:00",
      familyMember: "Ana Silva",
      category: "Hormonal"
    },
    {
      examName: "Creatinina",
      value: 0.9,
      unit: "mg/dL",
      trend: "stable" as const,
      referenceRange: "0.7-1.3 mg/dL",
      date: "11/11/2025",
      collectionDate: "2025-11-11",
      collectionTime: "10:00",
      familyMember: "João Silva",
      category: "Função Renal"
    },
    {
      examName: "LDL Colesterol",
      value: 110,
      unit: "mg/dL",
      trend: "down" as const,
      referenceRange: "<130 mg/dL",
      date: "10/11/2025",
      collectionDate: "2025-11-10",
      collectionTime: "11:15",
      familyMember: "Maria Silva",
      category: "Lipidograma"
    },
    {
      examName: "Leucócitos",
      value: 7200,
      unit: "/mm³",
      trend: "stable" as const,
      referenceRange: "4000-11000 /mm³",
      date: "09/11/2025",
      collectionDate: "2025-11-09",
      collectionTime: "15:30",
      familyMember: "Pedro Silva",
      category: "Hemograma"
    },
    {
      examName: "Vitamina D",
      value: 32,
      unit: "ng/mL",
      trend: "up" as const,
      referenceRange: "30-100 ng/mL",
      date: "08/11/2025",
      collectionDate: "2025-11-08",
      collectionTime: "08:45",
      familyMember: "Ana Silva",
      category: "Vitaminas"
    },
    {
      examName: "TGO/AST",
      value: 28,
      unit: "U/L",
      trend: "stable" as const,
      referenceRange: "<40 U/L",
      date: "07/11/2025",
      collectionDate: "2025-11-07",
      collectionTime: "13:00",
      familyMember: "João Silva",
      category: "Função Hepática"
    },
    {
      examName: "Triglicerídeos",
      value: 140,
      unit: "mg/dL",
      trend: "down" as const,
      referenceRange: "<150 mg/dL",
      date: "06/11/2025",
      collectionDate: "2025-11-06",
      collectionTime: "09:30",
      familyMember: "Maria Silva",
      category: "Lipidograma"
    },
    {
      examName: "Plaquetas",
      value: 245000,
      unit: "/mm³",
      trend: "stable" as const,
      referenceRange: "150000-400000 /mm³",
      date: "05/11/2025",
      collectionDate: "2025-11-05",
      collectionTime: "14:15",
      familyMember: "Pedro Silva",
      category: "Hemograma"
    },
    {
      examName: "T4 Livre",
      value: 1.2,
      unit: "ng/dL",
      trend: "stable" as const,
      referenceRange: "0.8-1.8 ng/dL",
      date: "04/11/2025",
      collectionDate: "2025-11-04",
      collectionTime: "10:45",
      familyMember: "Ana Silva",
      category: "Hormonal"
    },
    {
      examName: "Ureia",
      value: 35,
      unit: "mg/dL",
      trend: "stable" as const,
      referenceRange: "15-45 mg/dL",
      date: "03/11/2025",
      collectionDate: "2025-11-03",
      collectionTime: "08:15",
      familyMember: "João Silva",
      category: "Função Renal"
    },
    {
      examName: "HDL Colesterol",
      value: 55,
      unit: "mg/dL",
      trend: "up" as const,
      referenceRange: ">40 mg/dL",
      date: "02/11/2025",
      collectionDate: "2025-11-02",
      collectionTime: "11:00",
      familyMember: "Maria Silva",
      category: "Lipidograma"
    },
    {
      examName: "Hemácias",
      value: 4.8,
      unit: "milhões/mm³",
      trend: "stable" as const,
      referenceRange: "4.5-5.5 milhões/mm³",
      date: "01/11/2025",
      collectionDate: "2025-11-01",
      collectionTime: "16:30",
      familyMember: "Pedro Silva",
      category: "Hemograma"
    },
  ];

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.familyMember.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = filterMember === "all" || exam.familyMember === filterMember;
    const matchesCategory = filterCategory === "all" || exam.category === filterCategory;
    const matchesDate = !filterDate || exam.collectionDate === filterDate;
    const matchesTime = !filterTime || exam.collectionTime === filterTime;
    
    return matchesSearch && matchesMember && matchesCategory && matchesDate && matchesTime;
  });

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = filteredExams.slice(startIndex, endIndex);

  const categories = Array.from(new Set(exams.map(exam => exam.category)));
  const members = Array.from(new Set(exams.map(exam => exam.familyMember)));

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Reset para página 1 quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterMember, filterCategory, filterDate, filterTime]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterMember("all");
    setFilterCategory("all");
    setFilterDate(todayDate);
    setFilterTime("");
  };

  const isFiltered = searchTerm || filterMember !== "all" || filterCategory !== "all" || filterDate !== todayDate || filterTime;

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
                className="text-slate-600 hover:bg-teal-50 hover:text-teal-700"
              >
                Gestão de Exames
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate("/my-results")}
                className="text-teal-700 hover:bg-teal-50"
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-teal-900 mb-2">Meus Resultados</h1>
              <p className="text-slate-600">Visualize e gerencie todos os resultados de exames</p>
            </div>
            <Button 
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-teal-100">
              <CardContent className="p-6">
                <p className="text-slate-600 mb-2">Total de Resultados</p>
                <p className="text-teal-900">{exams.length}</p>
              </CardContent>
            </Card>
            <Card className="border-teal-100">
              <CardContent className="p-6">
                <p className="text-slate-600 mb-2">Este Mês</p>
                <p className="text-teal-900">12</p>
              </CardContent>
            </Card>
            <Card className="border-teal-100">
              <CardContent className="p-6">
                <p className="text-slate-600 mb-2">Categorias</p>
                <p className="text-teal-900">{categories.length}</p>
              </CardContent>
            </Card>
            <Card className="border-teal-100">
              <CardContent className="p-6">
                <p className="text-slate-600 mb-2">Membros</p>
                <p className="text-teal-900">{members.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle className="text-teal-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros e Busca
              </CardTitle>
              <CardDescription>
                Refine sua busca para encontrar resultados específicos. Por padrão, mostra exames da data atual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Primeira linha de filtros */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-700">Buscar</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Nome do exame ou membro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-teal-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700">Membro da Família</label>
                    <Select value={filterMember} onValueChange={setFilterMember}>
                      <SelectTrigger className="border-teal-100">
                        <SelectValue placeholder="Todos os membros" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os membros</SelectItem>
                        {members.map((member) => (
                          <SelectItem key={member} value={member}>
                            {member}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700">Categoria</label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="border-teal-100">
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Data da Coleta
                    </label>
                    <Input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="border-teal-100"
                    />
                  </div>
                </div>

                {/* Segunda linha - horário */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-700">Horário da Coleta (opcional)</label>
                    <Input
                      type="time"
                      value={filterTime}
                      onChange={(e) => setFilterTime(e.target.value)}
                      className="border-teal-100"
                      placeholder="00:00"
                    />
                  </div>
                </div>

                {isFiltered && (
                  <div className="flex items-center justify-between pt-2 border-t border-teal-100">
                    <p className="text-slate-600">
                      {filteredExams.length} resultado(s) encontrado(s)
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllFilters}
                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div>
            <h2 className="text-teal-900 mb-6">
              Resultados {filterCategory !== "all" ? `- ${filterCategory}` : ""}
            </h2>
            
            {currentExams.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                  {currentExams.map((exam, index) => (
                    <ExamCard key={startIndex + index} {...exam} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600">
                      Mostrando {startIndex + 1} a {Math.min(endIndex, filteredExams.length)} de {filteredExams.length} exames
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
              </>
            ) : (
              <Card className="border-teal-100">
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    Nenhum resultado encontrado com os filtros aplicados
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-teal-200 text-teal-700 hover:bg-teal-50"
                    onClick={clearAllFilters}
                  >
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}