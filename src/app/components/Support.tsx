import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { 
  Activity, 
  LogOut, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Send,
  HelpCircle,
  FileQuestion,
  Users,
  Shield,
  Zap,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner@2.0.3";

type TicketStatus = "pending" | "in-progress" | "resolved";

type Ticket = {
  id: string;
  subject: string;
  category: string;
  status: TicketStatus;
  createdAt: Date;
  lastUpdate: Date;
  priority: "low" | "medium" | "high";
};

export function Support() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
    priority: "medium"
  });

  const [myTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      subject: "Erro ao processar exame",
      category: "Técnico",
      status: "in-progress",
      createdAt: new Date(2025, 10, 28),
      lastUpdate: new Date(2025, 11, 1),
      priority: "high"
    },
    {
      id: "TKT-002",
      subject: "Dúvida sobre valores de referência",
      category: "Geral",
      status: "resolved",
      createdAt: new Date(2025, 10, 25),
      lastUpdate: new Date(2025, 10, 26),
      priority: "low"
    }
  ]);

  const faqs = [
    {
      category: "Conta e Acesso",
      icon: Users,
      questions: [
        {
          question: "Como redefinir minha senha?",
          answer: "Na tela de login, clique em 'Esqueci minha senha'. Você receberá um e-mail com um link para criar uma nova senha. O link é válido por 24 horas."
        },
        {
          question: "Como alterar meu e-mail de cadastro?",
          answer: "Acesse 'Meu Perfil' no menu do usuário e clique em 'Editar E-mail'. Você receberá um código de verificação no novo e-mail para confirmar a alteração."
        },
        {
          question: "Posso ter mais de uma conta?",
          answer: "Cada CPF pode ter apenas uma conta cadastrada. Se você precisa gerenciar dados de várias famílias, utilize a função 'Gerenciar Família' dentro da sua conta."
        }
      ]
    },
    {
      category: "Segurança e Privacidade",
      icon: Shield,
      questions: [
        {
          question: "Meus dados estão seguros?",
          answer: "Sim! Utilizamos criptografia de ponta a ponta (TLS 1.3) para todas as transmissões de dados. Seus exames são armazenados em servidores seguros com certificação ISO 27001 e seguimos rigorosamente as normas da LGPD."
        },
        {
          question: "Quem pode ver meus exames?",
          answer: "Apenas você e os membros da família que você autorizar explicitamente podem acessar seus exames. Nossa equipe técnica nunca acessa seus dados sem autorização expressa e apenas para fins de suporte técnico."
        },
        {
          question: "Como excluir meus dados?",
          answer: "Você pode solicitar a exclusão completa dos seus dados em 'Configurações' > 'Privacidade' > 'Excluir Conta'. Todos os dados serão permanentemente removidos em até 30 dias."
        }
      ]
    },
    {
      category: "Processamento de Exames",
      icon: Zap,
      questions: [
        {
          question: "Quanto tempo leva para processar um exame?",
          answer: "O processamento automático normalmente leva de 5 a 15 minutos. Em casos de análise manual, pode levar até 24 horas. Você receberá uma notificação quando o processamento for concluído."
        },
        {
          question: "Por que meu exame falhou no processamento?",
          answer: "As principais causas são: PDF protegido por senha, imagem de baixa qualidade, formato não padrão do laboratório ou exame manuscrito. Você pode solicitar uma reanálise manual clicando em 'Solicitar Reanálise'."
        },
        {
          question: "Posso processar exames de qualquer laboratório?",
          answer: "Sim, nosso sistema é compatível com exames da maioria dos laboratórios brasileiros. No entanto, exames muito antigos ou com formatação não padrão podem requerer análise manual."
        },
        {
          question: "Há limite de exames que posso enviar?",
          answer: "No plano gratuito, você pode enviar até 10 exames por mês. Planos pagos oferecem uploads ilimitados e processamento prioritário."
        }
      ]
    },
    {
      category: "Resultados e Histórico",
      icon: FileQuestion,
      questions: [
        {
          question: "Como interpretar os valores dos meus exames?",
          answer: "Cada exame exibe a faixa de referência normal. Valores fora da faixa são destacados. No entanto, SEMPRE consulte um médico para interpretar seus resultados corretamente."
        },
        {
          question: "Como comparar resultados ao longo do tempo?",
          answer: "Na seção 'Meus Resultados', clique em um exame e ative 'Habilitar Histórico'. Você verá um gráfico com todas as medições anteriores daquele exame."
        },
        {
          question: "Posso exportar meus resultados?",
          answer: "Sim! Em 'Meus Resultados', clique em 'Exportar' e escolha o formato desejado (PDF, Excel ou CSV). Você pode exportar resultados individuais ou todos os exames de um período."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: Mail,
      title: "E-mail",
      description: "suporte@minhasaudefamiliar.com.br",
      response: "Resposta em até 24h",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "(11) 3000-0000",
      response: "Seg-Sex: 8h às 18h",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "(11) 99000-0000",
      response: "Resposta em até 2h",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Bot,
      title: "Chatbot",
      description: "Assistente virtual 24/7",
      response: "Resposta imediata",
      color: "from-purple-500 to-purple-600",
      action: () => navigate("/chatbot")
    }
  ];

  const getStatusBadge = (status: TicketStatus) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock, label: "Pendente" },
      "in-progress": { color: "bg-blue-100 text-blue-700", icon: AlertCircle, label: "Em Andamento" },
      resolved: { color: "bg-green-100 text-green-700", icon: CheckCircle2, label: "Resolvido" }
    };
    
    const variant = variants[status];
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {variant.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: "low" | "medium" | "high") => {
    const variants = {
      low: { color: "bg-slate-100 text-slate-700", label: "Baixa" },
      medium: { color: "bg-orange-100 text-orange-700", label: "Média" },
      high: { color: "bg-red-100 text-red-700", label: "Alta" }
    };
    
    return (
      <Badge variant="outline" className={`${variants[priority].color} border-0`}>
        {variants[priority].label}
      </Badge>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Simula envio do formulário
    toast.success("Sua solicitação foi enviada com sucesso! Você receberá uma resposta em breve.");
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
      priority: "medium"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                className="text-teal-700 hover:bg-teal-50"
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
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-teal-900">Central de Suporte</h1>
                <p className="text-slate-600">Estamos aqui para ajudá-lo em todas as suas necessidades</p>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Card 
                  key={index} 
                  className="border-teal-100 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={channel.action}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-14 h-14 bg-gradient-to-br ${channel.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-teal-900 mb-1">{channel.title}</p>
                        <p className="text-slate-600">{channel.description}</p>
                        <p className="text-slate-500 mt-2">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {channel.response}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="contact" className="space-y-6">
            <TabsList className="bg-white border border-teal-100">
              <TabsTrigger value="contact" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                Nova Solicitação
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                Perguntas Frequentes
              </TabsTrigger>
              <TabsTrigger value="tickets" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                Minhas Solicitações
              </TabsTrigger>
            </TabsList>

            {/* Contact Form Tab */}
            <TabsContent value="contact">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-teal-100">
                  <CardHeader>
                    <CardTitle className="text-teal-900">Abrir Nova Solicitação</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo e nossa equipe entrará em contato em breve
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Seu nome completo"
                            className="border-teal-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="seu@email.com"
                            className="border-teal-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Descreva brevemente o problema"
                          className="border-teal-200"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria *</Label>
                          <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-teal-200 bg-white text-slate-900"
                          >
                            <option value="">Selecione uma categoria</option>
                            <option value="technical">Problema Técnico</option>
                            <option value="billing">Financeiro</option>
                            <option value="account">Conta e Acesso</option>
                            <option value="exams">Processamento de Exames</option>
                            <option value="general">Dúvida Geral</option>
                            <option value="other">Outro</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Prioridade</Label>
                          <select
                            id="priority"
                            value={formData.priority}
                            onChange={(e) => handleInputChange("priority", e.target.value)}
                            className="w-full h-10 px-3 rounded-md border border-teal-200 bg-white text-slate-900"
                          >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Descreva sua solicitação em detalhes..."
                          className="min-h-[150px] border-teal-200"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Solicitação
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-teal-900 mb-2">Tempo de Resposta</p>
                          <p className="text-slate-600">
                            Normalmente respondemos em até 24 horas durante dias úteis.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-100">
                    <CardHeader>
                      <CardTitle className="text-teal-900">Dica</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">
                        Antes de abrir uma solicitação, verifique nossas Perguntas Frequentes. Você pode encontrar a resposta mais rapidamente!
                      </p>
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={() => document.querySelector('[value="faq"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}
                      >
                        Ver FAQ
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <div className="space-y-6">
                {faqs.map((category, catIndex) => {
                  const Icon = category.icon;
                  return (
                    <Card key={catIndex} className="border-teal-100">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-teal-900">{category.category}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {category.questions.map((faq, faqIndex) => (
                            <AccordionItem key={faqIndex} value={`item-${catIndex}-${faqIndex}`}>
                              <AccordionTrigger className="text-left hover:text-teal-700">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-slate-600">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* My Tickets Tab */}
            <TabsContent value="tickets">
              <Card className="border-teal-100">
                <CardHeader>
                  <CardTitle className="text-teal-900">Minhas Solicitações</CardTitle>
                  <CardDescription>
                    Acompanhe o status das suas solicitações de suporte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 border border-teal-100 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-teal-900">{ticket.subject}</p>
                              <Badge variant="outline" className="border-teal-200 text-teal-700">
                                {ticket.id}
                              </Badge>
                            </div>
                            <p className="text-slate-500">
                              Categoria: {ticket.category}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {getPriorityBadge(ticket.priority)}
                            {getStatusBadge(ticket.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Criado: {ticket.createdAt.toLocaleDateString("pt-BR")}
                          </span>
                          <span className="flex items-center gap-1">
                            Atualizado: {ticket.lastUpdate.toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    ))}

                    {myTickets.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        Você ainda não tem solicitações de suporte
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}