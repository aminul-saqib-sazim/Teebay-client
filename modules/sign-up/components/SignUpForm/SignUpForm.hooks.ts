import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignUpMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { signUpFormInitialValues, signUpFormValidationSchemaResolver } from "./SignUpForm.helpers";
import { TSignUpFormFields } from "./SignUpForm.types";

export const useSignUpForm = () => {
  const router = useRouter();
  const form = useForm<TSignUpFormFields>({
    defaultValues: signUpFormInitialValues,
    resolver: signUpFormValidationSchemaResolver,
    reValidateMode: "onBlur",
  });
  const [signUp] = useSignUpMutation();

  const onSubmit = async (values: TSignUpFormFields) => {
    try {
      const { confirmPassword: _, ...rest } = values;
      await signUp(rest).unwrap();

      toast.success("Sign Up successful");

      form.reset();

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (error) {
      toast.error("Sign Up failed", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
