import { IResetPasswordDto } from "@/shared/typedefs/api";

export type TSignInRequestFields = {
  email: string;
  password: string;
};

export type TRequestPasswordFields = IResetPasswordDto & {
  token: string;
};
