import {
  ADMIN_PANEL_ROUTE,
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SUPER_USER_DASHBOARD_ROUTE,
} from "@/shared/constants/routes.constants";
import { EUserRole } from "@/shared/typedefs/api";

export const getSignInUrlWithRedirectParam = (redirectTo: string) => {
  const url = new URL(SIGN_IN_ROUTE, window.location.origin);
  url.searchParams.set("redirect", redirectTo);
  return url.toString();
};

export const getDefaultAllowedRolesInSignedInRoute = () => [EUserRole.ADMIN];

export const getRoleBasedDefaultRouteAfterSignIn = (role: EUserRole) => {
  switch (role) {
    case EUserRole.SUPER_USER:
      return SUPER_USER_DASHBOARD_ROUTE;
    case EUserRole.ADMIN:
      return ADMIN_PANEL_ROUTE;
    default:
      return HOME_ROUTE;
  }
};
