import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { DASHBOARD_ROUTE, SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";
import { getSession } from "@/shared/lib/auth-client";

const AuthCallbackContainer = () => {
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady || hasChecked) return;

    const handleCallback = async () => {
      setHasChecked(true);
      const token = router.query["token"] as string | undefined;

      if (token) {
        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
        const sessionResult = await getSession();

        if (sessionResult.data?.session) {
          router.replace(DASHBOARD_ROUTE);
        } else {
          router.replace(SIGN_IN_ROUTE);
        }
      } else {
        const sessionResult = await getSession();
        if (sessionResult.data?.session) {
          router.replace(DASHBOARD_ROUTE);
        } else {
          router.replace(SIGN_IN_ROUTE);
        }
      }
    };

    handleCallback();
  }, [router.isReady, router, hasChecked]);

  return <FullPageLoadingSpinner />;
};

export default AuthCallbackContainer;
