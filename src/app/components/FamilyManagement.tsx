import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Activity, 
  LogOut, 
  Users, 
  Plus, 
  Crown, 
  UserPlus,
  Mail,
  Bell,
  Settings,
  Shield,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateGroupDialog } from "./CreateGroupDialog";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { ManageGroupDialog } from "./ManageGroupDialog";
import { ConsentRequestsDialog } from "./ConsentRequestsDialog";
import { GroupCard } from "./GroupCard";

export type Group = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  members: GroupMember[];
  pendingInvites: number;
};

export type GroupMember = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  joinedAt: Date;
  hasConsent: boolean;
  consentType?: "individual" | "group";
  avatar?: string;
};

export type ConsentRequest = {
  id: string;
  fromUser: string;
  fromUserEmail: string;
  toUser: string;
  groupId?: string;
  groupName?: string;
  type: "individual" | "group";
  requestDate: Date;
  status: "pending" | "approved" | "rejected";
  message?: string;
};

export type Invitation = {
  id: string;
  groupId: string;
  groupName: string;
  invitedBy: string;
  invitedEmail: string;
  invitedName: string;
  sentDate: Date;
  status: "pending" | "accepted" | "rejected" | "expired";
  message?: string;
};

export function FamilyManagement() {
  const navigate = useNavigate();
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);
  const [manageGroupOpen, setManageGroupOpen] = useState(false);
  const [consentRequestsOpen, setConsentRequestsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "GRP-001",
      name: "Família Silva",
      description: "Grupo principal da família",
      createdAt: new Date(2024, 0, 15),
      createdBy: "João Silva",
      members: [
        {
          id: "MBR-001",
          name: "João Silva",
          email: "joao@email.com",
          role: "owner",
          joinedAt: new Date(2024, 0, 15),
          hasConsent: true,
          consentType: "group"
        },
        {
          id: "MBR-002",
          name: "Maria Silva",
          email: "maria@email.com",
          role: "admin",
          joinedAt: new Date(2024, 0, 16),
          hasConsent: true,
          consentType: "group"
        },
        {
          id: "MBR-003",
          name: "Pedro Silva",
          email: "pedro@email.com",
          role: "member",
          joinedAt: new Date(2024, 1, 1),
          hasConsent: true,
          consentType: "individual"
        },
        {
          id: "MBR-004",
          name: "Ana Silva",
          email: "ana@email.com",
          role: "member",
          joinedAt: new Date(2024, 1, 10),
          hasConsent: false
        }
      ],
      pendingInvites: 1
    },
    {
      id: "GRP-002",
      name: "Avós",
      description: "Grupo dos avós para acompanhamento médico",
      createdAt: new Date(2024, 2, 1),
      createdBy: "João Silva",
      members: [
        {
          id: "MBR-001",
          name: "João Silva",
          email: "joao@email.com",
          role: "owner",
          joinedAt: new Date(2024, 2, 1),
          hasConsent: true,
          consentType: "group"
        },
        {
          id: "MBR-005",
          name: "Carlos Silva",
          email: "carlos@email.com",
          role: "member",
          joinedAt: new Date(2024, 2, 5),
          hasConsent: true,
          consentType: "group"
        }
      ],
      pendingInvites: 0
    }
  ]);

  const [consentRequests, setConsentRequests] = useState<ConsentRequest[]>([
    {
      id: "CST-001",
      fromUser: "Ana Silva",
      fromUserEmail: "ana@email.com",
      toUser: "João Silva",
      groupId: "GRP-001",
      groupName: "Família Silva",
      type: "group",
      requestDate: new Date(2025, 10, 1),
      status: "pending",
      message: "Gostaria de compartilhar meus exames com o grupo familiar"
    },
    {
      id: "CST-002",
      fromUser: "Lucas Silva",
      fromUserEmail: "lucas@email.com",
      toUser: "João Silva",
      type: "individual",
      requestDate: new Date(2025, 10, 3),
      status: "pending",
      message: "Preciso que você acompanhe meus resultados médicos"
    }
  ]);

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: "INV-001",
      groupId: "GRP-001",
      groupName: "Família Silva",
      invitedBy: "João Silva",
      invitedEmail: "jose@email.com",
      invitedName: "José Silva",
      sentDate: new Date(2025, 10, 5),
      status: "pending",
      message: "Convite para participar do grupo familiar"
    }
  ]);

  const handleCreateGroup = (name: string, description: string) => {
    const newGroup: Group = {
      id: `GRP-${(groups.length + 1).toString().padStart(3, '0')}`,
      name,
      description,
      createdAt: new Date(),
      createdBy: "João Silva",
      members: [
        {
          id: "MBR-001",
          name: "João Silva",
          email: "joao@email.com",
          role: "owner",
          joinedAt: new Date(),
          hasConsent: true,
          consentType: "group"
        }
      ],
      pendingInvites: 0
    };
    setGroups([...groups, newGroup]);
    setCreateGroupOpen(false);
  };

  const handleInviteMember = (groupId: string, email: string, name: string, message: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const newInvitation: Invitation = {
      id: `INV-${(invitations.length + 1).toString().padStart(3, '0')}`,
      groupId,
      groupName: group.name,
      invitedBy: "João Silva",
      invitedEmail: email,
      invitedName: name,
      sentDate: new Date(),
      status: "pending",
      message
    };

    setInvitations([...invitations, newInvitation]);
    
    // Atualiza o contador de convites pendentes
    setGroups(groups.map(g => 
      g.id === groupId ? { ...g, pendingInvites: g.pendingInvites + 1 } : g
    ));
    
    setInviteMemberOpen(false);
  };

  const handleManageGroup = (group: Group) => {
    setSelectedGroup(group);
    setManageGroupOpen(true);
  };

  const handleUpdateMemberRole = (groupId: string, memberId: string, newRole: "admin" | "member") => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.map(member => 
            member.id === memberId ? { ...member, role: newRole } : member
          )
        };
      }
      return group;
    }));
  };

  const handleRemoveMember = (groupId: string, memberId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId)
        };
      }
      return group;
    }));
  };

  const handleConsentAction = (requestId: string, action: "approved" | "rejected") => {
    setConsentRequests(consentRequests.map(request => 
      request.id === requestId ? { ...request, status: action } : request
    ));
  };

  const handleInvitationAction = (invitationId: string, action: "accepted" | "rejected") => {
    setInvitations(invitations.map(invitation => 
      invitation.id === invitationId ? { ...invitation, status: action } : invitation
    ));

    if (action === "accepted") {
      const invitation = invitations.find(inv => inv.id === invitationId);
      if (invitation) {
        // Atualiza o contador de convites pendentes
        setGroups(groups.map(g => 
          g.id === invitation.groupId ? { ...g, pendingInvites: Math.max(0, g.pendingInvites - 1) } : g
        ));
      }
    }
  };

  const pendingConsentRequests = consentRequests.filter(r => r.status === "pending");
  const pendingInvitations = invitations.filter(i => i.status === "pending");
  const totalNotifications = pendingConsentRequests.length + pendingInvitations.length;

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
                className="text-teal-700 hover:bg-teal-50"
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
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-teal-900">Gerenciamento de Família</h1>
                <p className="text-slate-600">Gerencie grupos, membros e permissões</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setConsentRequestsOpen(true)}
                className="border-teal-200 text-teal-700 hover:bg-teal-50 relative"
              >
                <Bell className="w-4 h-4 mr-2" />
                Solicitações
                {totalNotifications > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">
                    {totalNotifications}
                  </Badge>
                )}
              </Button>
              <Button
                onClick={() => setCreateGroupOpen(true)}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Grupo
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 mb-1">Total de Grupos</p>
                    <p className="text-teal-900">{groups.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 mb-1">Total de Membros</p>
                    <p className="text-teal-900">
                      {Array.from(new Set(groups.flatMap(g => g.members.map(m => m.id)))).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 mb-1">Convites Pendentes</p>
                    <p className="text-teal-900">{pendingInvitations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 mb-1">Solicitações</p>
                    <p className="text-teal-900">{pendingConsentRequests.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="groups" className="space-y-6">
            <TabsList className="bg-white border border-teal-100">
              <TabsTrigger value="groups" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                Meus Grupos
              </TabsTrigger>
              <TabsTrigger value="invitations" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                Convites Enviados
                {pendingInvitations.length > 0 && (
                  <Badge className="ml-2 bg-teal-500 text-white" variant="secondary">
                    {pendingInvitations.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Groups Tab */}
            <TabsContent value="groups">
              {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onManage={handleManageGroup}
                      onInvite={() => {
                        setSelectedGroup(group);
                        setInviteMemberOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-teal-100">
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-4">
                      Você ainda não criou nenhum grupo
                    </p>
                    <Button
                      onClick={() => setCreateGroupOpen(true)}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Grupo
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Invitations Tab */}
            <TabsContent value="invitations">
              <Card className="border-teal-100">
                <CardHeader>
                  <CardTitle className="text-teal-900">Convites Enviados</CardTitle>
                  <CardDescription>
                    Acompanhe o status dos convites que você enviou
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invitations.length > 0 ? (
                    <div className="space-y-4">
                      {invitations.map((invitation) => (
                        <div
                          key={invitation.id}
                          className="p-4 border border-teal-100 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-teal-900 mb-1">{invitation.invitedName}</p>
                              <p className="text-slate-500">{invitation.invitedEmail}</p>
                            </div>
                            <Badge
                              className={
                                invitation.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : invitation.status === "accepted"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            >
                              {invitation.status === "pending"
                                ? "Pendente"
                                : invitation.status === "accepted"
                                ? "Aceito"
                                : "Rejeitado"}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-slate-600">
                            <p>Grupo: {invitation.groupName}</p>
                            <p>Enviado em: {invitation.sentDate.toLocaleDateString("pt-BR")}</p>
                            {invitation.message && (
                              <p className="text-slate-500 italic">{invitation.message}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      Nenhum convite enviado ainda
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <CreateGroupDialog
        open={createGroupOpen}
        onOpenChange={setCreateGroupOpen}
        onCreateGroup={handleCreateGroup}
      />

      <InviteMemberDialog
        open={inviteMemberOpen}
        onOpenChange={setInviteMemberOpen}
        group={selectedGroup}
        onInviteMember={handleInviteMember}
      />

      <ManageGroupDialog
        open={manageGroupOpen}
        onOpenChange={setManageGroupOpen}
        group={selectedGroup}
        onUpdateMemberRole={handleUpdateMemberRole}
        onRemoveMember={handleRemoveMember}
      />

      <ConsentRequestsDialog
        open={consentRequestsOpen}
        onOpenChange={setConsentRequestsOpen}
        consentRequests={consentRequests}
        invitations={invitations}
        onConsentAction={handleConsentAction}
        onInvitationAction={handleInvitationAction}
      />
    </div>
  );
}
