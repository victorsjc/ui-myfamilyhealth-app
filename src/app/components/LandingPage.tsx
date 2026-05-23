import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Activity, FileText, TrendingUp, Shield, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Gestão de Exames",
      description: "Organize e armazene todos os exames médicos da sua família em um único lugar seguro."
    },
    {
      icon: Activity,
      title: "Acompanhamento de Resultados",
      description: "Visualize e compare resultados de exames ao longo do tempo com facilidade."
    },
    {
      icon: TrendingUp,
      title: "Histórico Completo",
      description: "Mantenha um histórico detalhado de todos os procedimentos e exames realizados."
    },
    {
      icon: Shield,
      title: "Segurança de Dados",
      description: "Seus dados médicos protegidos com as mais modernas tecnologias de segurança."
    },
    {
      icon: Users,
      title: "Toda a Família",
      description: "Gerencie exames de todos os membros da família em uma única conta."
    },
    {
      icon: Clock,
      title: "Processamento Rápido",
      description: "Upload e processamento automático de documentos PDF em minutos."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-teal-900">MinhaSaudeFamiliar</span>
          </div>
          <Button onClick={() => navigate("/login")} variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-teal-900">
            Gestão Inteligente de Exames Médicos para Toda a Família
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Organize, acompanhe e tenha acesso rápido a todos os exames médicos da sua família. 
            Uma solução completa para o cuidado com a saúde de quem você ama.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              onClick={() => navigate("/login")} 
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-teal-900 mb-4">Recursos Principais</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar os exames médicos da sua família de forma eficiente e segura
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-teal-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-teal-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 border-none">
          <CardContent className="p-12 text-center">
            <h2 className="text-white mb-4">Pronto para Começar?</h2>
            <p className="text-teal-50 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de famílias que já confiam na MinhaSaudeFamiliar para gerenciar sua saúde
            </p>
            <Button 
              onClick={() => navigate("/login")}
              size="lg"
              variant="secondary"
              className="bg-white text-teal-600 hover:bg-teal-50"
            >
              Criar Conta Gratuita
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-teal-100">
        <div className="text-center text-slate-600">
          <p>&copy; 2025 MinhaSaudeFamiliar. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}