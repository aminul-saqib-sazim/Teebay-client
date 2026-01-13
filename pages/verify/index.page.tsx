import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { parseAsString, useQueryState } from "nuqs";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadui/card";
import PublicRoute from "@/shared/components/wrappers/PublicRoute";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { organization, verifyEmail } from "@/shared/lib/auth-client";
import { NextApplicationPage } from "@/shared/typedefs";

const VerifyEmailPage: NextApplicationPage = () => {
  const router = useRouter();
  const [token] = useQueryState("token", parseAsString.withDefault(""));

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !token || isVerifying || isVerified || error) return;

    const verify = async () => {
      setIsVerifying(true);
      try {
        const result = await verifyEmail(
          { query: { token } },
          {
            onSuccess: (ctx) => {
              const authToken = ctx.response.headers.get("set-auth-token");
              if (authToken) {
                localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, authToken);
              }
            },
          },
        );

        if (result.error) {
          setError(result.error.message || "Verification failed");
        } else {
          const orgsResult = await organization.list();
          const firstOrg = orgsResult.data?.[0];
          if (firstOrg) {
            await organization.setActive({ organizationId: firstOrg.id });
          }

          setIsVerified(true);
          setTimeout(() => {
            router.push(DASHBOARD_ROUTE);
          }, 2000);
        }
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setIsVerifying(false);
      }
    };

    verify();
  }, [router.isReady, token, isVerifying, isVerified, error, router]);

  if (!router.isReady || isVerifying) {
    return <FullPageLoadingSpinner />;
  }

  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invalid Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No verification token provided. Please check the link in your email.</p>
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
            <CardTitle>Verification Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Email Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your email has been verified successfully. Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

VerifyEmailPage.Layout = GeneralLayout;
VerifyEmailPage.Guard = PublicRoute;

export default VerifyEmailPage;
