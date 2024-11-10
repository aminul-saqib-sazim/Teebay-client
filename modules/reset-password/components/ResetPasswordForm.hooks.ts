import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useResetPasswordMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import {
  resetPasswordFormInitialValues,
  resetPasswordFormValidationResolver,
} from "./ResetPasswordForm.helpers";
import { TResetPasswordFormFields } from "./ResetPasswordForm.types";

export const useResetPasswordForm = (token: string) => {
  const router = useRouter();
  const form = useForm<TResetPasswordFormFields>({
    defaultValues: resetPasswordFormInitialValues,
    resolver: resetPasswordFormValidationResolver,
    mode: "onBlur",
  });
  const [resetPasswordMutation, { reset }] = useResetPasswordMutation();

  const onSubmit = async (values: TResetPasswordFormFields) => {
    if (!token) {
      return;
    }

    try {
      await resetPasswordMutation({
        token,
        password: values.password,
      }).unwrap();

      toast.success("Password reset successfully");
      form.reset();
      reset();

      setTimeout(() => {
        router.replace("/sign-in");
      }, 2000);
    } catch (error) {
      toast.error("Failed to reset password", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
