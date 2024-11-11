import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import {
  changeUserRoleDefaultValues,
  changeUserRoleValidationSchemaResolver,
} from "./ChangeUserRoleForm.helpers";

export const useChangeUserRoleForm = ({
  userId,
  onSuccess,
  onError,
}: {
  userId?: number;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const form = useForm<typeof changeUserRoleDefaultValues>({
    defaultValues: changeUserRoleDefaultValues,
    mode: "onSubmit",
    resolver: changeUserRoleValidationSchemaResolver,
  });

  const [updateUser, { reset }] = useUpdateUserMutation();
  const onSubmit = async (data: typeof changeUserRoleDefaultValues) => {
    if (!userId) return;

    try {
      await updateUser({
        id: userId,
        roleId: parseInt(data.roleId),
      }).unwrap();

      form.reset();
      reset();

      toast.success("User role updated successfully");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError();
      }

      toast.error("Failed to update user role", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
