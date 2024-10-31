import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useSignInMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { signInFormInitialValues, signInFormValidationSchemaResolver } from "./SignInForm.helpers";
import { TSignInFormFields } from "./SignInForm.types";

export const useSignInForm = () => {
  const form = useForm<TSignInFormFields>({
    defaultValues: signInFormInitialValues,
    resolver: signInFormValidationSchemaResolver,
    reValidateMode: "onSubmit",
  });
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();
  const { getMe } = useSessionContext();

  const onSubmit = async (values: TSignInFormFields) => {
    try {
      const data = await signIn(values).unwrap();
      setInLocalStorage(data.accessToken, ACCESS_TOKEN_LOCAL_STORAGE_KEY);
      dispatch(setUser(data.user));
      await getMe().unwrap();
    } catch (error) {
      toast.error("Sign In failed", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
