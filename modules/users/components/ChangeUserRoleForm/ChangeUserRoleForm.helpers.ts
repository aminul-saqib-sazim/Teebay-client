import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";

export const changeUserRoleValidationSchema = z.object({
  role: z.nativeEnum(EUserRole, {
    required_error: "Role is required",
  }),
});

export type TChangeUserRoleFormFields = z.infer<typeof changeUserRoleValidationSchema>;

export const changeUserRoleDefaultValues: Partial<TChangeUserRoleFormFields> = {
  role: undefined,
};

export const changeUserRoleValidationSchemaResolver = zodResolver(changeUserRoleValidationSchema);
