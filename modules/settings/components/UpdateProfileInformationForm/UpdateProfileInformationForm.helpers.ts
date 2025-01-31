import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IUserProfileResponse, IUpdateUserProfileDto } from "@/shared/typedefs/api";

export const getUpdateProfileInformationInitialValues = (
  userProfile?: IUserProfileResponse,
): IUpdateUserProfileDto => ({
  firstName: userProfile?.firstName || "",
  lastName: userProfile?.lastName || "",
});

export const updateProfileInformationValidationSchema: z.ZodType<IUpdateUserProfileDto> = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});

export const updateProfileInformationValidationSchemaResolver = zodResolver(
  updateProfileInformationValidationSchema,
);
