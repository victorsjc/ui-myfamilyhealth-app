import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Crown, Shield, Users, UserPlus, Settings, Calendar } from "lucide-react";
import type { Group } from "./FamilyManagement";

type GroupCardProps = {
  group: Group;
  onManage: (group: Group) => void;
  onInvite: (group: Group) => void;
};

export function GroupCard({ group, onManage, onInvite }: GroupCardProps) {
  const admins = group.members.filter(m => m.role === "admin" || m.role === "owner");
  const membersWithoutConsent = group.members.filter(m => !m.hasConsent);

  return (
    <Card className="border-teal-100 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-teal-900 mb-1">{group.name}</CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </div>
          {group.pendingInvites > 0 && (
            <Badge className="bg-yellow-100 text-yellow-700">
              {group.pendingInvites} convite(s)
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{group.members.length} membros</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>{admins.length} admin(s)</span>
          </div>
        </div>

        {/* Members Preview */}
        <div>
          <p className="text-slate-700 mb-2">Membros:</p>
          <div className="flex flex-wrap gap-2">
            {group.members.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-1">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white text-xs">
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-slate-600 flex items-center gap-1">
                  {member.name.split(" ")[0]}
                  {member.role === "owner" && <Crown className="w-3 h-3 text-yellow-600" />}
                  {member.role === "admin" && <Shield className="w-3 h-3 text-blue-600" />}
                </span>
              </div>
            ))}
            {group.members.length > 4 && (
              <span className="text-slate-500">+{group.members.length - 4}</span>
            )}
          </div>
        </div>

        {/* Warnings */}
        {membersWithoutConsent.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800">
              {membersWithoutConsent.length} membro(s) sem consentimento
            </p>
          </div>
        )}

        {/* Created Info */}
        <div className="flex items-center gap-1 text-slate-500 pt-2 border-t border-teal-50">
          <Calendar className="w-3 h-3" />
          <span>Criado em {group.createdAt.toLocaleDateString("pt-BR")}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onManage(group)}
            className="flex-1 border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <Settings className="w-4 h-4 mr-1" />
            Gerenciar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onInvite(group)}
            className="flex-1 border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Convidar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
