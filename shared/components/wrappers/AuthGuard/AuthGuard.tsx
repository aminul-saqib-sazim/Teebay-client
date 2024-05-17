import { useEffect } from "react";

import { useRouter } from "next/router";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Unauthorized from "../../Unauthorized/Unauthorized";
import { useSessionContext } from "../AppInitializer/AppInitializerContext";
import { TAuthGuardProps } from "./AuthGuard.types";
import {
  getDefaultAllowedRolesInLoggedInRoute,
  getLoginUrlWithRedirectParam,
} from "./AuthGuard.utils";

const AuthGuard = ({ children, allowedRoles }: TAuthGuardProps) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    allowedRoles = getDefaultAllowedRolesInLoggedInRoute();
  }

  const router = useRouter();
  const { isLoading, error, user } = useSessionContext();
  const isUnauthenticated = !isLoading && (error || !user);
  const isUnauthorized = !isLoading && !error && user && !allowedRoles.includes(user.claim);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (!isLoading && isUnauthenticated) {
      const redirectTo = `${location.pathname}${location.search}`;
      router.push(getLoginUrlWithRedirectParam(redirectTo));
    }
  }, [router, isLoading, error, isUnauthenticated, isUnauthorized]);

  if (isLoading) return <LoadingSpinner />;

  if (isUnauthenticated || isUnauthorized) return <Unauthorized />;

  return <>{children}</>;
};

export default AuthGuard;
