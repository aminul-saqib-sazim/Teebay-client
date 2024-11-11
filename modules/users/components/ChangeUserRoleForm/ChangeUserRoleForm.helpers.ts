import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const changeUserRoleDefaultValues = {
  roleId: "",
};

export const changeUserRoleValidationSchema: z.ZodType<typeof changeUserRoleDefaultValues> =
  z.object({
    roleId: z.string().min(1, "Role is required"),
  });

export const changeUserRoleValidationSchemaResolver = zodResolver(changeUserRoleValidationSchema);
