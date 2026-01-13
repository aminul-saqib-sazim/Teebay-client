import { SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";
import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

export const getSignInUrlWithRedirectParam = (redirectTo: string) => {
  const url = new URL(SIGN_IN_ROUTE, window.location.origin);
  url.searchParams.set("redirect", redirectTo);
  return url.toString();
};

export const getDefaultAllowedRolesInSignedInRoute = () => Object.values(EUserRole);
