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
import { Users } from "lucide-react";
import { toast } from "sonner@2.0.3";

type CreateGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (name: string, description: string) => void;
};

export function CreateGroupDialog({
  open,
  onOpenChange,
  onCreateGroup,
}: CreateGroupDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Por favor, insira um nome para o grupo");
      return;
    }

    onCreateGroup(name.trim(), description.trim());
    toast.success(`Grupo "${name}" criado com sucesso!`);
    
    // Reset form
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-teal-900">Criar Novo Grupo</DialogTitle>
              <DialogDescription>
                Crie um grupo para gerenciar exames da família
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Grupo *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Família Silva, Avós, etc."
                className="border-teal-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o propósito deste grupo..."
                className="border-teal-200 min-h-[100px]"
              />
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-slate-700 mb-2">Ao criar um grupo:</p>
              <ul className="text-slate-600 space-y-1 list-disc list-inside">
                <li>Você será o proprietário e administrador</li>
                <li>Você poderá convidar outros membros</li>
                <li>Você poderá promover membros a administradores</li>
                <li>Membros precisam dar consentimento para compartilhar dados</li>
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
              Criar Grupo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
