import { useEffect } from "react";

import { useRouter } from "next/router";

import LoginContainer from "@/modules/login/container/LoginContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import NextHead from "@/shared/components/NextHead";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER } from "@/shared/constants/app.constants";
import { NextApplicationPage } from "@/shared/typedefs";

const Login: NextApplicationPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      if (router.query["redirect"]) {
        router.push(router.query["redirect"] as string);
      } else {
        router.push(DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER);
      }
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <LoadingSpinner />;

  return (
    <>
      <NextHead />
      <LoginContainer />
    </>
  );
};

export default Login;
