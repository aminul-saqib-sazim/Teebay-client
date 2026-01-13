import { PropsWithChildren } from "react";

import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

type TProtectedRouteParams = {
  allowedRoles?: EUserRole[];
};

export type TProtectedRouteProps = PropsWithChildren<TProtectedRouteParams>;
