import { PropsWithChildren, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import { useAuth } from "@/shared/providers/AuthProvider";

import FullPageLoadingSpinner from "../../FullPageLoadingSpinner";

const PublicRoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading || isRedirecting) return;

    if (isAuthenticated) {
      setIsRedirecting(true);
      router.replace(DASHBOARD_ROUTE);
    }
  }, [router, isLoading, isAuthenticated, isRedirecting]);

  if (isLoading || isRedirecting) {
    return <FullPageLoadingSpinner />;
  }

  if (isAuthenticated) {
    return <FullPageLoadingSpinner />;
  }

  return <>{children}</>;
};

export default PublicRoute;
