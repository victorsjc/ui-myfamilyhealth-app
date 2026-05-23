import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <span className="text-teal-900">MinhaSaudeFamiliar</span>
          </div>
          <p className="text-slate-600">Gestão de Exames Médicos</p>
        </div>

        {/* Login Card */}
        <Card className="border-teal-100 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-teal-900">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-teal-100 focus-visible:ring-teal-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-teal-100 focus-visible:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="remember" className="text-slate-600 cursor-pointer">
                    Lembrar-me
                  </label>
                </div>
                <Button type="button" variant="link" className="text-teal-600 px-0">
                  Esqueceu a senha?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Não tem uma conta?{" "}
                <Button type="button" variant="link" className="text-teal-600 px-1">
                  Criar conta
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost"
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          >
            ← Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}