import React from "react";

import { FaLink } from "react-icons/fa";

import CustomLink from "@/shared/components/CustomLink/CustomLink";
import GoogleOAuthButton from "@/shared/components/OAuthSignin/GoogleOAuthButton";
import { Button } from "@/shared/components/shadui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/shadui/card";
import { Separator } from "@/shared/components/shadui/separator";
import { getGoogleOAuthSigninParams } from "@/shared/oauth/oauth.helpers";

import { SignInForm } from "../components/SignInForm";

const SignInContainer = () => {
  const googleOAuthParams = getGoogleOAuthSigninParams();

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign-in to your account</CardTitle>
          <CardDescription>Enter your credentials to sign-in</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <CustomLink href="/forgot-password" label="Forgot Password?" className="my-4" />

          <Separator className="my-4" />

          <div className="flex flex-col space-y-4">
            <Button variant="outline">
              <FaLink /> Sign In with Magic Link
            </Button>
            <GoogleOAuthButton label="Sign In with Google" googleOAuthParams={googleOAuthParams} />
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-center gap-1">
            <p>Don&rsquo;t have an account?</p>
            <CustomLink href="/sign-up" label="Sign Up" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInContainer;
