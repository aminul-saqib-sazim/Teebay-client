import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EUserRole } from "@/shared/redux/rtk-apis/roles/roles.enums";
import { IInviteUserDto } from "@/shared/redux/rtk-apis/users/users.interfaces";

export const inviteUserFormInitialValues: IInviteUserDto = {
  email: "",
  firstName: "",
  lastName: "",
  role: EUserRole.MEMBER,
};

export const inviteUserFormValidationSchema: z.ZodType<IInviteUserDto> = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  role: z.nativeEnum(EUserRole),
});

export const inviteUserFormResolver = zodResolver(inviteUserFormValidationSchema);
