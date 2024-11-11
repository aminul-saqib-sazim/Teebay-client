import { IRoleResponse, ISuperuserUserResponse } from "@/shared/typedefs/api";

export type TChangeUserRoleDialogProps = {
  user: ISuperuserUserResponse | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  roles: IRoleResponse[];
  onCancel?: () => void;
};
