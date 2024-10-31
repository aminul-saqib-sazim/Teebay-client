import { useEffect } from "react";

import { useRouter } from "next/router";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { HOME_ROUTE, SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";

import { useGetMe } from "../useGetMe";

export const useSubscribeToSignInStorageEvent = () => {
  const router = useRouter();
  const { getMeOnLoad } = useGetMe();

  useEffect(() => {
    const isSignInEvent = (event: StorageEvent) =>
      event.key === ACCESS_TOKEN_LOCAL_STORAGE_KEY && event.newValue;

    const handleSignInEvent = async (event: StorageEvent) => {
      if (!isSignInEvent(event) || router.pathname !== SIGN_IN_ROUTE) return;

      await getMeOnLoad();

      router.push(HOME_ROUTE);
    };

    window.addEventListener("storage", handleSignInEvent);

    return () => {
      window.removeEventListener("storage", handleSignInEvent);
    };
  }, [router, getMeOnLoad]);
};
