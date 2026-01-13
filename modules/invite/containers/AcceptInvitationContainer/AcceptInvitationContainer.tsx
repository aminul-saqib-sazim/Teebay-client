import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Button } from "@/shared/components/shadui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadui/card";
import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import { organization, useSession } from "@/shared/lib/auth-client";
import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

import { IInvitationDetails } from "./AcceptInvitationContainer.interfaces";

const AcceptInvitationContainer = () => {
  const router = useRouter();
  const [token] = useQueryState("token", parseAsString.withDefault(""));
  const { data: session, isPending: isSessionLoading } = useSession();

  const [isAccepting, setIsAccepting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invitation, setInvitation] = useState<IInvitationDetails | null>(null);
  const [isLoadingInvitation, setIsLoadingInvitation] = useState(true);

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!router.isReady || !token) {
      setIsLoadingInvitation(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        const result = await organization.getInvitation({ query: { id: token } });
        if (result.data) {
          setInvitation({
            organizationName: result.data.organizationName,
            organizationSlug: result.data.organizationSlug,
            inviterEmail: result.data.inviterEmail,
            role: result.data.role as EUserRole,
          });
        }
      } catch {
        toast.error("Failed to load invitation", {
          description: "Invitation might not exist or be expired",
        });
      } finally {
        setIsLoadingInvitation(false);
      }
    };

    fetchInvitation();
  }, [router.isReady, token]);

  const handleAcceptInvitation = async () => {
    if (!token) return;

    setIsAccepting(true);
    setError(null);

    try {
      const result = await organization.acceptInvitation({
        invitationId: token,
      });

      if (result.error) {
        setError(result.error.message || "Failed to accept invitation");
      } else {
        if (result.data?.member?.organizationId) {
          await organization.setActive({ organizationId: result.data.member.organizationId });
        }
        setIsAccepted(true);
        setTimeout(() => {
          router.push(DASHBOARD_ROUTE);
        }, 2000);
      }
    } catch {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setIsAccepting(false);
    }
  };

  if (!router.isReady || isSessionLoading || isLoadingInvitation) {
    return <FullPageLoadingSpinner />;
  }

  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invalid Invitation Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No invitation token provided. Please check the link in your email.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Accept Organization Invitation</CardTitle>
            <CardDescription>Account required</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Please create and verify your account first, then come back to this page to accept the
              invitation.
            </p>
            <p className="text-sm text-muted-foreground">
              Save this link or check your invitation email again after creating your account.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAccepting) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Accepting Invitation...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we add you to the organization.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invitation Failed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{error}</p>
            <Button onClick={handleAcceptInvitation}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAccepted) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have successfully joined the organization. Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Accept Organization Invitation</CardTitle>
          <CardDescription>
            {invitation
              ? `You have been invited to join "${invitation.organizationName}" as ${invitation.role}`
              : "You have been invited to join an organization"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invitation && (
            <p className="text-sm text-muted-foreground">Invited by: {invitation.inviterEmail}</p>
          )}
          <p>Click the button below to accept the invitation and join the organization.</p>
          <Button onClick={handleAcceptInvitation} className="w-full">
            Accept Invitation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptInvitationContainer;
