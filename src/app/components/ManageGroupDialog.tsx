import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Crown, 
  Shield, 
  User, 
  MoreVertical,
  UserMinus,
  ShieldCheck,
  ShieldOff,
  CheckCircle2,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import type { Group, GroupMember } from "./FamilyManagement";

type ManageGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
  onUpdateMemberRole: (groupId: string, memberId: string, newRole: "admin" | "member") => void;
  onRemoveMember: (groupId: string, memberId: string) => void;
};

export function ManageGroupDialog({
  open,
  onOpenChange,
  group,
  onUpdateMemberRole,
  onRemoveMember,
}: ManageGroupDialogProps) {
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  if (!group) return null;

  const handlePromoteToAdmin = (member: GroupMember) => {
    onUpdateMemberRole(group.id, member.id, "admin");
    toast.success(`${member.name} foi promovido a administrador`);
  };

  const handleDemoteToMember = (member: GroupMember) => {
    onUpdateMemberRole(group.id, member.id, "member");
    toast.success(`${member.name} foi alterado para membro comum`);
  };

  const handleRemoveMember = (member: GroupMember) => {
    if (confirmRemove === member.id) {
      onRemoveMember(group.id, member.id);
      toast.success(`${member.name} foi removido do grupo`);
      setConfirmRemove(null);
    } else {
      setConfirmRemove(member.id);
      setTimeout(() => setConfirmRemove(null), 3000);
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "owner") {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-0">
          <Crown className="w-3 h-3 mr-1" />
          Proprietário
        </Badge>
      );
    }
    if (role === "admin") {
      return (
        <Badge className="bg-blue-100 text-blue-700 border-0">
          <Shield className="w-3 h-3 mr-1" />
          Administrador
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-slate-200 text-slate-700">
        <User className="w-3 h-3 mr-1" />
        Membro
      </Badge>
    );
  };

  const getConsentBadge = (member: GroupMember) => {
    if (!member.hasConsent) {
      return (
        <Badge className="bg-red-100 text-red-700 border-0">
          <XCircle className="w-3 h-3 mr-1" />
          Sem consentimento
        </Badge>
      );
    }
    return (
      <Badge className="bg-green-100 text-green-700 border-0">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        {member.consentType === "group" ? "Grupo" : "Individual"}
      </Badge>
    );
  };

  const ownerMembers = group.members.filter(m => m.role === "owner");
  const adminMembers = group.members.filter(m => m.role === "admin");
  const regularMembers = group.members.filter(m => m.role === "member");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-teal-900">{group.name}</DialogTitle>
          <DialogDescription>{group.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center">
              <p className="text-slate-600 mb-1">Total</p>
              <p className="text-teal-900">{group.members.length}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-slate-600 mb-1">Admins</p>
              <p className="text-teal-900">{ownerMembers.length + adminMembers.length}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-slate-600 mb-1">Com Consentimento</p>
              <p className="text-teal-900">
                {group.members.filter(m => m.hasConsent).length}
              </p>
            </div>
          </div>

          {/* Owner Members */}
          {ownerMembers.length > 0 && (
            <div>
              <h3 className="text-teal-900 mb-3">Proprietário</h3>
              <div className="space-y-2">
                {ownerMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-teal-100 rounded-lg bg-yellow-50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-teal-900">{member.name}</p>
                        <p className="text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRoleBadge(member.role)}
                      {getConsentBadge(member)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Members */}
          {adminMembers.length > 0 && (
            <div>
              <h3 className="text-teal-900 mb-3">Administradores</h3>
              <div className="space-y-2">
                {adminMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-teal-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-teal-900">{member.name}</p>
                        <p className="text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRoleBadge(member.role)}
                      {getConsentBadge(member)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDemoteToMember(member)}>
                            <ShieldOff className="w-4 h-4 mr-2" />
                            Remover como Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveMember(member)}
                            className="text-red-600"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            {confirmRemove === member.id ? "Confirmar remoção?" : "Remover do Grupo"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Members */}
          {regularMembers.length > 0 && (
            <div>
              <h3 className="text-teal-900 mb-3">Membros</h3>
              <div className="space-y-2">
                {regularMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-teal-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-teal-900">{member.name}</p>
                        <p className="text-slate-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRoleBadge(member.role)}
                      {getConsentBadge(member)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handlePromoteToAdmin(member)}>
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Promover a Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveMember(member)}
                            className="text-red-600"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            {confirmRemove === member.id ? "Confirmar remoção?" : "Remover do Grupo"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-slate-700 mb-2">Informações importantes:</p>
            <ul className="text-slate-600 space-y-1 list-disc list-inside">
              <li>Apenas proprietários e admins podem gerenciar membros</li>
              <li>O proprietário não pode ser removido do grupo</li>
              <li>Membros sem consentimento não podem ver dados de saúde</li>
              <li>Admins podem convidar novos membros e promover outros</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
