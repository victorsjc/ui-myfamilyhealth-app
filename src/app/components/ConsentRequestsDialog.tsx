import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Shield, 
  Users, 
  User,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import type { ConsentRequest, Invitation } from "./FamilyManagement";

type ConsentRequestsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consentRequests: ConsentRequest[];
  invitations: Invitation[];
  onConsentAction: (requestId: string, action: "approved" | "rejected") => void;
  onInvitationAction: (invitationId: string, action: "accepted" | "rejected") => void;
};

export function ConsentRequestsDialog({
  open,
  onOpenChange,
  consentRequests,
  invitations,
  onConsentAction,
  onInvitationAction,
}: ConsentRequestsDialogProps) {
  const handleApproveConsent = (request: ConsentRequest) => {
    onConsentAction(request.id, "approved");
    toast.success(`Consentimento aprovado para ${request.fromUser}`);
  };

  const handleRejectConsent = (request: ConsentRequest) => {
    onConsentAction(request.id, "rejected");
    toast.error(`Consentimento rejeitado para ${request.fromUser}`);
  };

  const handleAcceptInvitation = (invitation: Invitation) => {
    onInvitationAction(invitation.id, "accepted");
    toast.success(`Você aceitou participar do grupo "${invitation.groupName}"`);
  };

  const handleRejectInvitation = (invitation: Invitation) => {
    onInvitationAction(invitation.id, "rejected");
    toast.error(`Você rejeitou o convite para "${invitation.groupName}"`);
  };

  const pendingConsentRequests = consentRequests.filter(r => r.status === "pending");
  const pendingInvitations = invitations.filter(i => i.status === "pending");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-teal-900">Solicitações Pendentes</DialogTitle>
          <DialogDescription>
            Gerencie solicitações de consentimento e convites recebidos
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="consent" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consent" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              Consentimentos
              {pendingConsentRequests.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {pendingConsentRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="invitations" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
              Convites Recebidos
              {pendingInvitations.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {pendingInvitations.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Consent Requests Tab */}
          <TabsContent value="consent" className="space-y-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-slate-700 mb-2">O que é consentimento?</p>
              <ul className="text-slate-600 space-y-1 list-disc list-inside">
                <li><strong>Individual:</strong> Compartilhar dados apenas com este usuário</li>
                <li><strong>Grupo:</strong> Compartilhar dados com todos do grupo</li>
                <li>Você pode revogar o consentimento a qualquer momento</li>
              </ul>
            </div>

            {pendingConsentRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingConsentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="border border-teal-100 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          request.type === "group"
                            ? "bg-gradient-to-br from-teal-500 to-cyan-600"
                            : "bg-gradient-to-br from-blue-500 to-blue-600"
                        }`}>
                          {request.type === "group" ? (
                            <Users className="w-5 h-5 text-white" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-teal-900 mb-1">{request.fromUser}</p>
                          <p className="text-slate-500">{request.fromUserEmail}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          request.type === "group"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      >
                        {request.type === "group" ? "Consentimento de Grupo" : "Consentimento Individual"}
                      </Badge>
                    </div>

                    {request.groupName && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Shield className="w-4 h-4" />
                        <span>Grupo: {request.groupName}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Solicitado em: {request.requestDate.toLocaleDateString("pt-BR")}</span>
                    </div>

                    {request.message && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5" />
                          <p className="text-slate-600 italic">{request.message}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleApproveConsent(request)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button
                        onClick={() => handleRejectConsent(request)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>Nenhuma solicitação de consentimento pendente</p>
              </div>
            )}

            {/* History */}
            {consentRequests.filter(r => r.status !== "pending").length > 0 && (
              <div className="mt-6">
                <h3 className="text-teal-900 mb-3">Histórico</h3>
                <div className="space-y-2">
                  {consentRequests
                    .filter(r => r.status !== "pending")
                    .map((request) => (
                      <div
                        key={request.id}
                        className="border border-slate-200 rounded-lg p-3 opacity-60"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-700">{request.fromUser}</p>
                            <p className="text-slate-500">
                              {request.type === "group" ? "Grupo" : "Individual"}
                              {request.groupName && ` - ${request.groupName}`}
                            </p>
                          </div>
                          <Badge
                            className={
                              request.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {request.status === "approved" ? "Aprovado" : "Rejeitado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-4 mt-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-slate-700 mb-2">Sobre convites de grupo:</p>
              <ul className="text-slate-600 space-y-1 list-disc list-inside">
                <li>Ao aceitar, você se torna membro do grupo</li>
                <li>Você ainda precisará dar consentimento para compartilhar dados</li>
                <li>Você pode sair do grupo a qualquer momento</li>
              </ul>
            </div>

            {pendingInvitations.length > 0 ? (
              <div className="space-y-4">
                {pendingInvitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="border border-teal-100 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-teal-900 mb-1">
                            Convite para: {invitation.groupName}
                          </p>
                          <p className="text-slate-500">
                            Convidado por: {invitation.invitedBy}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">
                        Pendente
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Enviado em: {invitation.sentDate.toLocaleDateString("pt-BR")}</span>
                    </div>

                    {invitation.message && (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5" />
                          <p className="text-slate-600 italic">{invitation.message}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleAcceptInvitation(invitation)}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Aceitar Convite
                      </Button>
                      <Button
                        onClick={() => handleRejectInvitation(invitation)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Rejeitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>Nenhum convite pendente</p>
              </div>
            )}

            {/* History */}
            {invitations.filter(i => i.status !== "pending").length > 0 && (
              <div className="mt-6">
                <h3 className="text-teal-900 mb-3">Histórico</h3>
                <div className="space-y-2">
                  {invitations
                    .filter(i => i.status !== "pending")
                    .map((invitation) => (
                      <div
                        key={invitation.id}
                        className="border border-slate-200 rounded-lg p-3 opacity-60"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-slate-700">{invitation.groupName}</p>
                            <p className="text-slate-500">
                              Convidado por {invitation.invitedBy}
                            </p>
                          </div>
                          <Badge
                            className={
                              invitation.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : invitation.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-slate-100 text-slate-700"
                            }
                          >
                            {invitation.status === "accepted"
                              ? "Aceito"
                              : invitation.status === "rejected"
                              ? "Rejeitado"
                              : "Expirado"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
