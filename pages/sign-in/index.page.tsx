import { useEffect } from "react";

import { useRouter } from "next/router";

import SignInContainer from "@/modules/sign-in/container/SignInContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import NextHead from "@/shared/components/NextHead";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { HOME_ROUTE } from "@/shared/constants/routes.constants";
import { NextApplicationPage } from "@/shared/typedefs";

const SignIn: NextApplicationPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      if (router.query["redirect"]) {
        router.push(router.query["redirect"] as string);
      } else {
        router.push(HOME_ROUTE);
      }
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <LoadingSpinner />;

  return (
    <>
      <NextHead />
      <SignInContainer />
    </>
  );
};

export default SignIn;
