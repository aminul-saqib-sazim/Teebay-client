import { ReactNode } from "react";

import { EPermission } from "@/shared/typedefs";

interface IAuthorizationGuardBaseProps {
  children: ReactNode;
  permissions: Record<string, EPermission[]>;
}

export interface IAuthorizationGuardWithFallbackComponent extends IAuthorizationGuardBaseProps {
  fallbackComponent: ReactNode;
  fallbackRoute?: never;
}

export interface IAuthorizationGuardWithFallbackRoute extends IAuthorizationGuardBaseProps {
  fallbackRoute: string;
  fallbackComponent?: never;
}
