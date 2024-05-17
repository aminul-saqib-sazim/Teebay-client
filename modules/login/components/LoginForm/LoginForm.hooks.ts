import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { loginFormInitialValues, loginFormValidationSchemaResolver } from "./LoginForm.helpers";
import { TLoginFormFields } from "./LoginForm.types";

export const useLoginForm = () => {
  const form = useForm<TLoginFormFields>({
    defaultValues: loginFormInitialValues,
    resolver: loginFormValidationSchemaResolver,
    reValidateMode: "onSubmit",
  });
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { getMe } = useSessionContext();

  const onSubmit = async (values: TLoginFormFields) => {
    try {
      const data = await login(values).unwrap();
      setInLocalStorage(data.accessToken, ACCESS_TOKEN_LOCAL_STORAGE_KEY);
      dispatch(setUser(data.user));
      await getMe().unwrap();
    } catch (error) {
      toast.error("Login failed", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
