import { ISelfRegisterUserDto } from "@/shared/typedefs/api";

export type TSignUpFormFields = ISelfRegisterUserDto & {
  confirmPassword: string;
};
