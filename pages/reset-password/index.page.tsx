import { useRouter } from "next/router";

import { parseAsString, useQueryState } from "nuqs";

import ResetPasswordContainer from "@/modules/reset-password/containers";
import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/components/shadui/card";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { useFindOneVerificationRequestQuery } from "@/shared/redux/rtk-apis/verification-requests/verification-requests.api";
import { NextApplicationPage } from "@/shared/typedefs";
import { EVerificationRequestType } from "@/shared/typedefs/api";

const ResetPasswordPage: NextApplicationPage = () => {
  const router = useRouter();
  const [token] = useQueryState("token", parseAsString.withDefault(""));

  const isReady = router.isReady;

  const { isFetching, isLoading, isUninitialized, isError } = useFindOneVerificationRequestQuery(
    {
      token: token,
      type: EVerificationRequestType.RESET_PASSWORD,
    },
    {
      skip: !token || !isReady,
    },
  );

  const isFetchingVerificationRequest = isFetching || isLoading || isUninitialized;

  if (isFetchingVerificationRequest) {
    return <FullPageLoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Invalid Token</CardTitle>
            <CardDescription>
              The token you provided is invalid. Please check the link in your email and try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return <ResetPasswordContainer />;
};

ResetPasswordPage.Layout = GeneralLayout;

export default ResetPasswordPage;
