import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadui/card";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import {
  useFindOneVerificationRequestQuery,
  useVerifyTokenMutation,
} from "@/shared/redux/rtk-apis/verification-requests/verification-requests.api";
import { NextApplicationPage } from "@/shared/typedefs";

const VerifyTokenPage: NextApplicationPage = () => {
  const router = useRouter();
  const { token, type } = router.query;

  const { error, isLoading, isUninitialized, isFetching } = useFindOneVerificationRequestQuery(
    { token: token as string, type: type as string },
    { skip: !token || !type },
  );

  const isTokenFound = !isUninitialized && !isLoading && !isFetching && !error;

  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [isTokenVerificationError, setIsTokenVerificationError] = useState(false);
  const [verifyToken] = useVerifyTokenMutation();

  useEffect(() => {
    if (!isTokenFound) return;

    setIsVerifyingToken(true);
    verifyToken({ token: token as string, type: type as string })
      .unwrap()
      .then(() => setIsTokenVerified(true))
      .catch(() => setIsTokenVerificationError(true))
      .finally(() => setIsVerifyingToken(false));
  }, [isTokenFound, verifyToken, token, type]);

  if (isUninitialized || isLoading || isFetching || isVerifyingToken) {
    return <FullPageLoadingSpinner />;
  }

  if (error || isTokenVerificationError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Verification failed. Invalid Verification request.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTokenVerified) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Verification successful</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

VerifyTokenPage.Layout = GeneralLayout;

export default VerifyTokenPage;
