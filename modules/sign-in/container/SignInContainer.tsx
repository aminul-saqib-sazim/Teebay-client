import React from "react";

import { LanguageSelector } from "@/shared/components/LanguageSelector";

import { SignInForm } from "../components/SignInForm";

const SignInContainer = () => (
  <div>
    <LanguageSelector />
    <SignInForm />
  </div>
);

export default SignInContainer;
