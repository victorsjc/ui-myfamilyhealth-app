import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Brain,
  Users,
  FileText,
  Shield,
  Check,
  X,
  Menu,
  ChevronRight,
  Heart,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Sparkles,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? 28 : size === "lg" ? 52 : 38;
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={dims}
        height={dims}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="52" height="52" rx="14" fill="#0d9488" />
        {/* Heart */}
        <path
          d="M26 38s-13-8.5-13-17a8 8 0 0 1 13-6.2A8 8 0 0 1 39 21c0 8.5-13 17-13 17z"
          fill="white"
          opacity="0.95"
        />
        {/* Plus / cross inside heart */}
        <path
          d="M26 24v6M23 27h6"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Small family dots */}
        <circle cx="16" cy="14" r="2.5" fill="white" opacity="0.7" />
        <circle cx="26" cy="11" r="2.5" fill="white" opacity="0.7" />
        <circle cx="36" cy="14" r="2.5" fill="white" opacity="0.7" />
      </svg>
      <span
        className={`font-bold tracking-tight ${textSize}`}
        style={{ fontFamily: "'Poppins', sans-serif", color: "#0b3d38" }}
      >
        Minha<span style={{ color: "#0d9488" }}>Saúde</span>Familiar
      </span>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: "Análise com IA",
    description:
      "Inteligência artificial analisa seus exames e destaca pontos de atenção, facilitando a compreensão dos resultados.",
  },
  {
    icon: Users,
    title: "Gestão Familiar",
    description:
      "Crie grupos familiares, convide membros e gerencie exames de toda a família em um único painel.",
  },
  {
    icon: FileText,
    title: "Histórico Permanente",
    description:
      "Todos os seus documentos médicos em PDF armazenados com segurança e acessíveis a qualquer momento.",
  },
  {
    icon: Shield,
    title: "Compartilhamento Seguro",
    description:
      "Controle quem vê seus dados. Consinta individualmente o acesso de cada membro ou do grupo inteiro.",
  },
];

const plans = [
  {
    name: "Freemium",
    price: "Grátis",
    period: "",
    badge: null,
    description: "Para quem está começando a organizar sua saúde.",
    color: "border-teal-200",
    ctaVariant: "outline" as const,
    ctaClass: "border-teal-500 text-teal-700 hover:bg-teal-50",
    items: [
      { text: "Até 2 membros na família", ok: true },
      { text: "Upload de até 10 documentos", ok: true },
      { text: "Histórico básico de exames", ok: true },
      { text: "Análise com IA", ok: false },
      { text: "Compartilhamento com consentimento", ok: false },
      { text: "Suporte prioritário", ok: false },
    ],
  },
  {
    name: "Premium",
    price: "R$ 99,90",
    period: "/ano",
    badge: "Mais Popular",
    description: "Tudo que sua família precisa para cuidar da saúde com IA.",
    color: "border-teal-500",
    ctaVariant: "default" as const,
    ctaClass: "bg-teal-500 hover:bg-teal-600 text-white",
    items: [
      { text: "Membros ilimitados", ok: true },
      { text: "Documentos ilimitados", ok: true },
      { text: "Histórico completo de exames", ok: true },
      { text: "Análise com IA", ok: true },
      { text: "Compartilhamento com consentimento", ok: true },
      { text: "Suporte prioritário", ok: true },
    ],
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-white text-foreground"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-teal-100">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Logo size="sm" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {["início", "sobre", "planos", "contato"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="capitalize hover:text-teal-600 transition-colors"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
              className="text-teal-700 hover:bg-teal-50"
            >
              Entrar
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/login")}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Começar Gratuitamente
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-teal-700"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-teal-100 bg-white px-5 py-4 flex flex-col gap-4">
            {["início", "sobre", "planos", "contato"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="capitalize text-left text-sm font-medium text-slate-600 hover:text-teal-600"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => navigate("/login")}
              className="bg-teal-500 hover:bg-teal-600 text-white w-full"
            >
              Começar Gratuitamente
            </Button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="início"
        className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-400"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-teal-800/20 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-5 py-24 md:py-32 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3 h-3 mr-1" /> Powered by Inteligência Artificial
          </Badge>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Cuide da saúde da sua
            <br />
            <span className="text-yellow-300">família com IA</span>
          </h1>

          <p className="text-teal-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Faça upload dos seus exames em PDF e deixe a inteligência artificial
            analisar, organizar e destacar os pontos que merecem atenção — para
            toda a família.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-white text-teal-700 hover:bg-teal-50 font-semibold shadow-lg"
            >
              Começar Gratuitamente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("sobre")}
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              Saiba Mais
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-teal-100 text-sm">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-yellow-300" /> Sem cartão de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-yellow-300" /> Grátis para sempre no plano Freemium
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-yellow-300" /> Dados 100% seguros
            </span>
          </div>
        </div>
      </section>

      {/* ── SOBRE / FEATURES ── */}
      <section id="sobre" className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-2">
            Por que usar
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0b3d38] mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Tudo que você precisa,<br className="hidden sm:block" /> num só lugar
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Chega de papéis perdidos e resultados espalhados. MinhaSaudeFamiliar
            centraliza a saúde de todos com tecnologia de ponta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={i}
                className="group border border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-bold text-[#0b3d38] mb-2 text-base">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-teal-600 py-14">
        <div className="max-w-4xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "10k+", label: "Famílias cadastradas" },
            { value: "250k+", label: "Exames processados" },
            { value: "99,9%", label: "Uptime garantido" },
            { value: "4.9★", label: "Avaliação média" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-yellow-300 mb-1">{s.value}</div>
              <div className="text-teal-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANOS ── */}
      <section id="planos" className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-2">
            Planos
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0b3d38] mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Escolha o plano ideal
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Comece gratuitamente e evolua quando a sua família crescer.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex-1 rounded-2xl border-2 ${plan.color} relative overflow-hidden`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-teal-500 text-white text-xs">{plan.badge}</Badge>
                </div>
              )}
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="font-bold text-xl text-[#0b3d38] mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-bold text-teal-600">{plan.price}</span>
                    {plan.period && (
                      <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      {item.ok ? (
                        <Check className="w-4 h-4 text-teal-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className={item.ok ? "text-slate-700" : "text-slate-400"}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  className={`w-full font-semibold ${plan.ctaClass}`}
                  onClick={() => navigate("/login")}
                >
                  {plan.name === "Premium" ? "Assinar Premium" : "Começar Grátis"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 py-20 text-center px-5">
        <Heart className="w-10 h-10 text-white/50 mx-auto mb-4" />
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Cuide de quem você ama
        </h2>
        <p className="text-teal-100 max-w-xl mx-auto mb-8">
          Junte-se a milhares de famílias que já usam a MinhaSaudeFamiliar para
          manter a saúde organizada e acessível.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/login")}
          className="bg-white text-teal-700 hover:bg-teal-50 font-semibold shadow-lg"
        >
          Criar Conta Gratuita
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </section>

      {/* ── CONTATO / FOOTER ── */}
      <footer id="contato" className="bg-[#0b3d38] text-teal-100">
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
                <rect width="52" height="52" rx="14" fill="#0d9488" />
                <path
                  d="M26 38s-13-8.5-13-17a8 8 0 0 1 13-6.2A8 8 0 0 1 39 21c0 8.5-13 17-13 17z"
                  fill="white"
                  opacity="0.95"
                />
                <path d="M26 24v6M23 27h6" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="14" r="2.5" fill="white" opacity="0.7" />
                <circle cx="26" cy="11" r="2.5" fill="white" opacity="0.7" />
                <circle cx="36" cy="14" r="2.5" fill="white" opacity="0.7" />
              </svg>
              <span className="font-bold text-white text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                MinhaSaúdeFamiliar
              </span>
            </div>
            <p className="text-teal-300 text-sm leading-relaxed">
              Inteligência artificial a serviço da saúde da sua família. Simples,
              seguro e acessível.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full bg-teal-700/50 flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-teal-200" />
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-teal-300">
              {["Início", "Sobre", "Planos", "Contato", "Login"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() =>
                      l === "Login" ? navigate("/login") : scrollTo(l.toLowerCase())
                    }
                    className="hover:text-white transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-teal-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                contato@minhasaudefamiliar.com.br
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                (11) 9 9999-9999
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                Dados protegidos por criptografia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-teal-500 gap-2">
          <span>© 2025 MinhaSaudeFamiliar. Todos os direitos reservados.</span>
          <span>Feito com <Heart className="w-3 h-3 inline text-teal-400" /> para famílias brasileiras</span>
        </div>
      </footer>
    </div>
  );
}
