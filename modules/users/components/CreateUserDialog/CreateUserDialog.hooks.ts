import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { createUserFormInitialValues, createUserFormResolver } from "./CreateUserDialog.helpers";
import { TCreateUserFormFields } from "./CreateUserDialog.types";

export const useCreateUserForm = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
  const form = useForm<TCreateUserFormFields>({
    defaultValues: createUserFormInitialValues,
    resolver: createUserFormResolver,
  });

  const [createUser] = useCreateUserMutation();

  const onSubmit = async (values: TCreateUserFormFields) => {
    try {
      const { confirmPassword: _, ...userData } = values;
      await createUser(userData).unwrap();
      toast.success("User created successfully");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create user", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
