import { IResetPasswordDto } from "@/shared/typedefs/api";

export type TResetPasswordFormFields = IResetPasswordDto & {
  confirmPassword: string;
};
