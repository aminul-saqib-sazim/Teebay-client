export const HOME_ROUTE = "/";

export const SIGN_IN_ROUTE = "/sign-in";
export const SIGN_UP_ROUTE = "/sign-up";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const RESET_PASSWORD_ROUTE = "/reset-password";
export const AUTH_CALLBACK_ROUTE = "/auth/callback";
export const VERIFY_ROUTE = "/verify";
export const INVITE_ACCEPT_ROUTE = "/invite/accept";

export const DASHBOARD_ROUTE = "/dashboard";
export const ADMIN_PANEL_ROUTE = "/admin-panel";
export const SUPER_USER_DASHBOARD_ROUTE = "/superuser/dashboard";

export const PUBLIC_ROUTES = [
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  VERIFY_ROUTE,
] as const;
