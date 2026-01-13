import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useInviteUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { IInviteUserDto } from "@/shared/redux/rtk-apis/users/users.interfaces";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { inviteUserFormInitialValues, inviteUserFormResolver } from "./CreateUserDialog.helpers";

export const useInviteUserForm = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
  const form = useForm<IInviteUserDto>({
    defaultValues: inviteUserFormInitialValues,
    resolver: inviteUserFormResolver,
  });

  const [inviteUser] = useInviteUserMutation();

  const onSubmit = async (values: IInviteUserDto) => {
    try {
      const result = await inviteUser(values).unwrap();
      if (result.success) {
        toast.success("Invitation sent successfully");
        form.reset();
        onOpenChange(false);
      } else {
        toast.error("Failed to invite user", {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error("Failed to invite user", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
