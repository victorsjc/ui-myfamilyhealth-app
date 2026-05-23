import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  Activity, 
  LogOut, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  MessageCircle,
  FileText,
  Clock,
  HelpCircle,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestions?: string[];
};

type FAQ = {
  question: string;
  answer: string;
  category: string;
  relatedQuestions?: string[];
};

export function ChatBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente virtual da MinhaSaudeFamiliar. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Como enviar um exame?",
        "Como visualizar resultados?",
        "Status de processamento",
        "Gerenciar família"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs: FAQ[] = [
    {
      question: "Como enviar um exame?",
      answer: "Para enviar um exame, vá para a seção 'Gestão de Exames' e clique em 'Enviar Novo Exame'. Você pode fazer upload do arquivo PDF do seu exame e preencher as informações necessárias.",
      category: "Envio de Exames",
      relatedQuestions: ["Quais formatos são aceitos?", "Quanto tempo demora o processamento?"]
    },
    {
      question: "Quais formatos são aceitos?",
      answer: "Aceitamos apenas arquivos em formato PDF. Certifique-se de que o arquivo está legível e não está protegido por senha.",
      category: "Envio de Exames"
    },
    {
      question: "Como visualizar resultados?",
      answer: "Você pode visualizar seus resultados na seção 'Meus Resultados'. Lá você encontrará todos os exames processados com sucesso, organizados por data de coleta.",
      category: "Resultados",
      relatedQuestions: ["Como filtrar por data?", "Como ver histórico?"]
    },
    {
      question: "Como filtrar por data?",
      answer: "Na seção 'Meus Resultados', você encontrará filtros de data que permitem selecionar o período desejado para visualizar seus exames.",
      category: "Resultados"
    },
    {
      question: "Como ver histórico?",
      answer: "Para ver o histórico de um exame específico, clique no card do exame e ative a opção 'Habilitar Histórico'. Isso mostrará todas as medições anteriores daquele exame.",
      category: "Resultados"
    },
    {
      question: "Status de processamento",
      answer: "Os exames podem ter os seguintes status: 'Em Processamento' (sendo analisado), 'Processado com Sucesso' (dados extraídos), 'Processado com Falha' (erro na extração), ou 'Em Análise' (verificação manual).",
      category: "Processamento",
      relatedQuestions: ["Quanto tempo demora o processamento?", "O que fazer se falhar?"]
    },
    {
      question: "Quanto tempo demora o processamento?",
      answer: "O processamento normalmente leva de 5 a 15 minutos. Você receberá uma notificação quando o processamento for concluído.",
      category: "Processamento"
    },
    {
      question: "O que fazer se falhar?",
      answer: "Se o processamento falhar, você pode solicitar uma reanálise clicando no card da solicitação e depois em 'Solicitar Reanálise'. Nossa equipe irá revisar manualmente o documento.",
      category: "Processamento"
    },
    {
      question: "Gerenciar família",
      answer: "Na seção 'Dashboard', você encontrará a opção 'Gerenciar Família' onde pode adicionar ou remover membros da família, e gerenciar permissões de acesso aos exames.",
      category: "Família",
      relatedQuestions: ["Como adicionar membro?", "Como remover membro?"]
    },
    {
      question: "Como adicionar membro?",
      answer: "Para adicionar um membro da família, acesse 'Gerenciar Família', clique em 'Adicionar Membro' e preencha as informações solicitadas (nome, parentesco, data de nascimento).",
      category: "Família"
    },
    {
      question: "Como remover membro?",
      answer: "Para remover um membro, acesse 'Gerenciar Família', selecione o membro desejado e clique em 'Remover'. Atenção: isso não excluirá os exames já registrados.",
      category: "Família"
    },
    {
      question: "Esqueci minha senha",
      answer: "Na tela de login, clique em 'Esqueci minha senha'. Você receberá um e-mail com instruções para redefinir sua senha.",
      category: "Conta"
    },
    {
      question: "Como alterar meus dados?",
      answer: "No menu do usuário (canto superior direito), clique em 'Meu Perfil' para editar suas informações pessoais.",
      category: "Conta"
    },
    {
      question: "Os dados são seguros?",
      answer: "Sim! Utilizamos criptografia de ponta a ponta e seguimos as normas da LGPD para proteger seus dados de saúde. Seus exames são armazenados de forma segura e apenas você e membros autorizados têm acesso.",
      category: "Segurança"
    }
  ];

  const quickActions = [
    { label: "Enviar Exame", path: "/exam-management" },
    { label: "Ver Resultados", path: "/my-results" },
    { label: "Suporte Técnico", path: "/support" },
    { label: "Dashboard", path: "/dashboard" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestMatch = (userMessage: string): FAQ | null => {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Busca exata
    let bestMatch = faqs.find(faq => 
      faq.question.toLowerCase() === normalizedMessage
    );

    if (bestMatch) return bestMatch;

    // Busca por palavras-chave
    const keywords = normalizedMessage.split(" ");
    let maxScore = 0;

    faqs.forEach(faq => {
      let score = 0;
      const faqWords = faq.question.toLowerCase().split(" ");
      const answerWords = faq.answer.toLowerCase().split(" ");

      keywords.forEach(keyword => {
        if (keyword.length < 3) return; // Ignora palavras muito curtas

        if (faqWords.some(word => word.includes(keyword))) score += 3;
        if (answerWords.some(word => word.includes(keyword))) score += 1;
        if (faq.category.toLowerCase().includes(keyword)) score += 2;
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    });

    return maxScore > 2 ? bestMatch : null;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    
    if (!messageText) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simula tempo de resposta do bot
    setTimeout(() => {
      const matchedFaq = findBestMatch(messageText);
      
      let botResponse: Message;

      if (matchedFaq) {
        const suggestions = matchedFaq.relatedQuestions || [];
        
        botResponse = {
          id: messages.length + 2,
          text: matchedFaq.answer,
          sender: "bot",
          timestamp: new Date(),
          suggestions: suggestions.length > 0 ? suggestions : undefined
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          text: "Desculpe, não encontrei uma resposta específica para sua pergunta. Você pode tentar reformular ou entrar em contato com nosso suporte técnico para ajuda personalizada.",
          sender: "bot",
          timestamp: new Date(),
          suggestions: [
            "Como enviar um exame?",
            "Status de processamento",
            "Falar com suporte"
          ]
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Falar com suporte") {
      navigate("/support");
    } else {
      handleSendMessage(suggestion);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
                className="text-teal-700 hover:bg-teal-50"
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
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-teal-900">Assistente Virtual</h1>
                <p className="text-slate-600">Estou aqui para ajudá-lo com suas dúvidas</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="border-teal-100 h-[600px] flex flex-col">
                <CardHeader className="border-b border-teal-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-teal-900">Chat de Autoajuda</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Online
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-teal-200 text-teal-700">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {messages.length} mensagens
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full px-6 py-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id}>
                          <div className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "bot" 
                                ? "bg-gradient-to-br from-teal-500 to-cyan-600" 
                                : "bg-gradient-to-br from-slate-500 to-slate-600"
                            }`}>
                              {message.sender === "bot" ? (
                                <Bot className="w-4 h-4 text-white" />
                              ) : (
                                <User className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className={`flex-1 max-w-[80%] ${message.sender === "user" ? "flex flex-col items-end" : ""}`}>
                              <div className={`rounded-2xl px-4 py-3 ${
                                message.sender === "bot"
                                  ? "bg-teal-50 text-slate-800"
                                  : "bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
                              }`}>
                                <p className="whitespace-pre-wrap">{message.text}</p>
                              </div>
                              <div className="flex items-center gap-1 mt-1 px-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-500">
                                  {message.timestamp.toLocaleTimeString("pt-BR", { 
                                    hour: "2-digit", 
                                    minute: "2-digit" 
                                  })}
                                </span>
                              </div>
                              {message.suggestions && message.suggestions.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {message.suggestions.map((suggestion, idx) => (
                                    <Button
                                      key={idx}
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleSuggestionClick(suggestion)}
                                      className="border-teal-200 text-teal-700 hover:bg-teal-50"
                                    >
                                      <HelpCircle className="w-3 h-3 mr-1" />
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-teal-50 rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="p-4 border-t border-teal-50">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua pergunta..."
                      className="flex-1 border-teal-200 focus:border-teal-500"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim()}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border-teal-100">
                <CardHeader>
                  <CardTitle className="text-teal-900">Ações Rápidas</CardTitle>
                  <CardDescription>Navegue para as principais seções</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start border-teal-200 text-teal-700 hover:bg-teal-50"
                      onClick={() => navigate(action.path)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Categories */}
              <Card className="border-teal-100">
                <CardHeader>
                  <CardTitle className="text-teal-900">Categorias de Ajuda</CardTitle>
                  <CardDescription>Perguntas mais comuns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from(new Set(faqs.map(faq => faq.category))).map((category, idx) => {
                      const count = faqs.filter(faq => faq.category === category).length;
                      return (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors">
                          <span className="text-slate-700">{category}</span>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                            {count}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Help Info */}
              <Card className="border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-700">
                        Não encontrou o que procura?
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/support")}
                        className="border-teal-200 text-teal-700 hover:bg-white"
                      >
                        Falar com Suporte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}