import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateMemberRoleMutation } from "@/shared/redux/rtk-apis/members/members.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import {
  changeUserRoleDefaultValues,
  changeUserRoleValidationSchemaResolver,
  TChangeUserRoleFormFields,
} from "./ChangeUserRoleForm.helpers";

export const useChangeUserRoleForm = ({
  userId,
  onSuccess,
  onError,
}: {
  userId?: string;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const form = useForm<TChangeUserRoleFormFields>({
    defaultValues: changeUserRoleDefaultValues,
    mode: "onSubmit",
    resolver: changeUserRoleValidationSchemaResolver,
  });

  const [updateMemberRole, { reset }] = useUpdateMemberRoleMutation();

  const onSubmit = async (data: TChangeUserRoleFormFields) => {
    if (!userId) return;

    try {
      await updateMemberRole({
        userId,
        role: data.role,
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
