import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import { organization, signIn } from "@/shared/lib/auth-client";

import { signInFormInitialValues, signInFormValidationSchemaResolver } from "./SignInForm.helpers";
import { TSignInFormFields } from "./SignInForm.types";

export const useSignInForm = () => {
  const router = useRouter();
  const redirect = (router.query["redirect"] as string) || DASHBOARD_ROUTE;

  const form = useForm<TSignInFormFields>({
    defaultValues: signInFormInitialValues,
    resolver: signInFormValidationSchemaResolver,
    reValidateMode: "onBlur",
  });

  const onSubmit = async (values: TSignInFormFields) => {
    const result = await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (ctx) => {
          const authToken = ctx.response.headers.get("set-auth-token");
          if (authToken) {
            localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, authToken);
          }
        },
      },
    );

    if (result.error) {
      toast.error("Sign In failed", {
        description: result.error.message || "Invalid credentials",
      });
      return;
    }

    const orgsResult = await organization.list();
    const firstOrg = orgsResult.data?.[0];
    if (firstOrg) {
      await organization.setActive({ organizationId: firstOrg.id });
    }

    toast.success("Signed in successfully");
    router.push(redirect);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
