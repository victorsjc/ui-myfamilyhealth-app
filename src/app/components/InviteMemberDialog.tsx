import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { UserPlus, Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";
import type { Group } from "./FamilyManagement";

type InviteMemberDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
  onInviteMember: (groupId: string, email: string, name: string, message: string) => void;
};

export function InviteMemberDialog({
  open,
  onOpenChange,
  group,
  onInviteMember,
}: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !name.trim()) {
      toast.error("Por favor, preencha o nome e e-mail");
      return;
    }

    if (!group) {
      toast.error("Nenhum grupo selecionado");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    onInviteMember(group.id, email.trim(), name.trim(), message.trim());
    toast.success(`Convite enviado para ${name}!`);
    
    // Reset form
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-teal-900">Convidar Membro</DialogTitle>
              <DialogDescription>
                {group ? `Enviar convite para o grupo "${group.name}"` : "Selecione um grupo"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do membro"
                className="border-teal-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  className="pl-10 border-teal-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem (opcional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Adicione uma mensagem personalizada ao convite..."
                className="border-teal-200 min-h-[100px]"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-slate-700 mb-2">Como funciona o convite:</p>
              <ul className="text-slate-600 space-y-1 list-disc list-inside">
                <li>O membro receberá um e-mail com o convite</li>
                <li>Ele poderá aceitar ou rejeitar o convite</li>
                <li>Após aceitar, ele precisará dar consentimento</li>
                <li>O consentimento pode ser individual ou para o grupo</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
            >
              Enviar Convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
