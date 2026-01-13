import { useEffect } from "react";

import { useRouter } from "next/router";

import { useAuthorizationGuard } from "./AuthorizationGuard.hooks";
import { TAuthorizationGuardProps } from "./AuthorizationGuard.types";

const AuthorizationGuard = (props: TAuthorizationGuardProps) => {
  const { children, permissions } = props;
  const router = useRouter();

  const { hasPermission, isLoading } = useAuthorizationGuard({
    permissions,
  });

  useEffect(() => {
    if (!isLoading && !hasPermission && "fallbackRoute" in props && !!props.fallbackRoute) {
      router.push(props.fallbackRoute);
    }
  }, [isLoading, hasPermission, props, router]);

  if (isLoading) {
    if ("fallbackComponent" in props) {
      return <>{props.fallbackComponent}</>;
    }
    return null;
  }

  if (!hasPermission) {
    if ("fallbackComponent" in props) {
      return <>{props.fallbackComponent}</>;
    }
    return null;
  }

  return <>{children}</>;
};

export default AuthorizationGuard;
