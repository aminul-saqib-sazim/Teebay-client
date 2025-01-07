import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { toast } from "sonner";

import CustomButton from "@/shared/components/Form/CustomButton";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import { EGoogleSSOPurpose } from "@/shared/oauth/oauth.enums";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useSignInWithGoogleMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { decodeBase64ToObject } from "@/shared/utils/base64";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

const GoogleCallbackContainer = () => {
  const router = useRouter();
  const { code, scope, state, error } = router.query;

  const dispatch = useAppDispatch();
  const [signInWithGoogleMutation] = useSignInWithGoogleMutation();
  const { getMe } = useSessionContext();

  const [callBackError, setCallBackError] = useState<string | string[] | null>(null);

  const signInWithGoogle = useCallback(
    async (code: string, scope: string) => {
      try {
        const data = await signInWithGoogleMutation({
          code: code,
          scope: scope,
        }).unwrap();

        setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data.accessToken);
        const user = { ...data.user };
        dispatch(setUser(user));
        await getMe().unwrap();

        router.push(DASHBOARD_ROUTE);
      } catch (error) {
        const errorMessage = parseApiErrorMessage(error);
        setCallBackError(errorMessage);
        toast.error("Signin failed", {
          description: errorMessage,
        });
      }
    },
    [dispatch, getMe, signInWithGoogleMutation, router],
  );

  useEffect(() => {
    if (
      !code ||
      !scope ||
      !state ||
      typeof code !== "string" ||
      typeof scope !== "string" ||
      typeof state !== "string"
    )
      return;

    if (error) {
      setCallBackError(error);
      toast.error("Error", {
        description: error,
      });
      window.close();
      return;
    }

    const decodedState = decodeBase64ToObject(state);
    const { purpose } = decodedState;

    if (purpose === EGoogleSSOPurpose.SIGN_IN) {
      signInWithGoogle(code, scope);
    } else {
      setCallBackError("Invalid state");
      toast.error("Error", {
        description: "Invalid state",
      });
      window.close();
    }
  }, [code, scope, state, error, signInWithGoogle]);

  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
      {callBackError ? (
        <>
          <div className="py-4">Error Occurred </div>
          <CustomButton variant={"ghost"} className="w-min">
            <Link href="/" className="text-xs">
              Go Home
            </Link>
          </CustomButton>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default GoogleCallbackContainer;
