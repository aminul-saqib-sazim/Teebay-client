import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signUp } from "@/shared/lib/auth-client";

import { signUpFormInitialValues, signUpFormValidationSchemaResolver } from "./SignUpForm.helpers";
import { TSignUpFormFields, TUseSignUpFormOptions } from "./SignUpForm.types";

export const useSignUpForm = (options?: TUseSignUpFormOptions) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<TSignUpFormFields>({
    defaultValues: signUpFormInitialValues,
    resolver: signUpFormValidationSchemaResolver,
    reValidateMode: "onBlur",
  });

  const onSubmit = async (values: TSignUpFormFields) => {
    const result = await signUp.email({
      email: values.email,
      password: values.password,
      name: `${values.firstName} ${values.lastName}`,
      firstName: values.firstName,
      lastName: values.lastName,
    } as Parameters<typeof signUp.email>[0]);

    if (result.error) {
      toast.error("Sign Up failed", {
        description: result.error.message || "Could not create account",
      });
      return;
    }

    setSubmittedEmail(values.email);
    setIsEmailSent(true);
    toast.success("Account created! Please check your email to verify.");
    options?.onEmailSent?.(values.email);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isEmailSent,
    submittedEmail,
  };
};
