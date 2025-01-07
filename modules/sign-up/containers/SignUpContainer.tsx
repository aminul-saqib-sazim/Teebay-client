import CustomLink from "@/shared/components/CustomLink/CustomLink";
import GoogleOAuthButton from "@/shared/components/OAuthSignin/GoogleOAuthButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadui/card";
import { Separator } from "@/shared/components/shadui/separator";
import { getGoogleOAuthSigninParams } from "@/shared/oauth/oauth.helpers";

import SignUpForm from "../components/SignUpForm";

const SignUpContainer = () => (
  <div className="flex-1 flex items-center justify-center p-4">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />

        <Separator className="my-4" />

        <div className="flex flex-col space-y-4">
          <GoogleOAuthButton
            label="Sign Up with Google"
            googleOAuthParams={getGoogleOAuthSigninParams()}
          />
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-center gap-1 mt-4">
          <p>Already have an account?</p>
          <CustomLink href="/sign-in" label="Sign In" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SignUpContainer;
