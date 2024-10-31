import { useEffect } from "react";

import { useRouter } from "next/router";

import { toast } from "sonner";

import { SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";
import { TOAST_MESSAGE_SESSION_EXPIRED } from "@/shared/constants/toastMessages.constants";
import { ESignOutReason, SIGN_OUT_EVENT_NAME } from "@/shared/utils/signOut";

import { useSignOut } from "../useSignOut";

export const useSubscribeToSignOutStorageEvent = () => {
  const router = useRouter();
  const { signOut } = useSignOut();

  useEffect(() => {
    const isSignOutEvent = (event: StorageEvent) => event.key === SIGN_OUT_EVENT_NAME;

    const isSignOutDueToTokenExpiry = (event: StorageEvent) =>
      event.key === SIGN_OUT_EVENT_NAME && event.newValue === ESignOutReason.TokenExpired;

    const handleSignOutEvent = (event: StorageEvent) => {
      if (!isSignOutEvent(event) || router.pathname === SIGN_IN_ROUTE) return;

      const isTokenExpired = isSignOutDueToTokenExpiry(event);

      if (isTokenExpired) {
        toast.error(TOAST_MESSAGE_SESSION_EXPIRED);
      }

      signOut({
        shouldEmitSignOutEvent: false,
        reason: isTokenExpired ? ESignOutReason.TokenExpired : ESignOutReason.UserSignedOut,
      });
    };

    window.addEventListener("storage", handleSignOutEvent);

    return () => {
      window.removeEventListener("storage", handleSignOutEvent);
    };
  }, [router, signOut]);
};
