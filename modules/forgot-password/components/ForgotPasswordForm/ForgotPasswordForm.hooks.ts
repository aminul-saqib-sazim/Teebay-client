import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useForgotPasswordMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import {
  forgotPasswordFormInitialValues,
  forgotPasswordFormValidationSchemaResolver,
} from "./ForgotPasswordForm.helpers";

export const useForgotPasswordForm = () => {
  const form = useForm<typeof forgotPasswordFormInitialValues>({
    defaultValues: forgotPasswordFormInitialValues,
    resolver: forgotPasswordFormValidationSchemaResolver,
    mode: "onBlur",
  });

  const [forgotPasswordMutation, result] = useForgotPasswordMutation();

  const onSubmit = async (values: typeof forgotPasswordFormInitialValues) => {
    try {
      await forgotPasswordMutation(values).unwrap();
      result.reset();
    } catch (error) {
      toast.error("An error occurred", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit,
    result,
  };
};
