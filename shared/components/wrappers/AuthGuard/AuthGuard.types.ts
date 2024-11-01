import { PropsWithChildren } from "react";

import { EUserRole } from "@/shared/typedefs/api";

type TAuthGuardParams = {
  allowedRoles?: EUserRole[];
};

export type TAuthGuardProps = PropsWithChildren<TAuthGuardParams>;
