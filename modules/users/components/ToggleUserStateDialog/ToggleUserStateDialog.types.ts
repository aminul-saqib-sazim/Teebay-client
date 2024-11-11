import { ISuperuserUserResponse } from "@/shared/typedefs/api";

export interface IToggleUserStateDialogProps {
  user?: ISuperuserUserResponse | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
}
