import { useEffect } from "react";

import i18nConfig from "@/next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import SignInContainer from "@/modules/sign-in/container/SignInContainer";
import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import NextHead from "@/shared/components/NextHead";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DASHBOARD_ROUTE } from "@/shared/constants/routes.constants";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
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
        router.push(DASHBOARD_ROUTE);
      }
    }
  }, [isLoading, user, router]);

  if (isLoading || user) return <FullPageLoadingSpinner />;

  return (
    <>
      <NextHead />
      <SignInContainer />
    </>
  );
};

SignIn.Layout = GeneralLayout;

export default SignIn;

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common", "sign-in"], i18nConfig)),
    },
  };
}
