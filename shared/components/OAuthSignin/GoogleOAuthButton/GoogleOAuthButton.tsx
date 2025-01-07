import { FaGoogle } from "react-icons/fa";

import { cn } from "@/lib/utils";
import CustomButton from "@/shared/components/Form/CustomButton";
import { GOOGLE_CLIENT_ID } from "@/shared/constants/env.constants";

import { TGoogleOAuthParams } from "./GoogleOAuthButton.types";

const GoogleOAuthButton: React.FC<{
  label: string;
  googleOAuthParams: TGoogleOAuthParams;
  className?: string;
}> = ({ label, googleOAuthParams, className }) => {
  const { accessType, redirectPath, scope, state } = googleOAuthParams;

  const redirectUri = new URL(redirectPath, window.location.origin).toString();

  if (!GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined");
  }

  const googleSigninUrl = new URL("https://accounts.google.com/o/oauth2/auth");

  const params = new URLSearchParams({
    response_type: "code",
    prompt: "consent",
    access_type: accessType,
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    state,
  });

  googleSigninUrl.search = params.toString();

  return (
    <CustomButton
      variant="default"
      className={cn("w-full text-sm bg-red-500 hover:bg-red-600 text-white", className)}
      onClick={() => {
        window.location.href = googleSigninUrl.toString();
      }}
    >
      <FaGoogle />
      {label}
    </CustomButton>
  );
};

export default GoogleOAuthButton;
