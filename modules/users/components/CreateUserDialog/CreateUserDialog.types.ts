import { IRegisterUserDto } from "@/shared/typedefs/api";

export type TCreateUserFormFields = IRegisterUserDto & {
  confirmPassword: string;
};

export interface ICreateUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  roles: Array<{ id: number; name: string }>;
}
