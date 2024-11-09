import React from "react";

import CustomLink from "@/shared/components/CustomLink/CustomLink";
import { Button } from "@/shared/components/shadui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/shadui/card";

import { SignInForm } from "../components/SignInForm";

const SignInContainer = () => (
  <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Sign-in to your account</CardTitle>
        <CardDescription>Enter your credentials to sign-in</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
        <CustomLink href="/forgot-password" label="Forgot Password?" className="my-4" />

        <hr className="h-px my-8 bg-gray-200 border-0" />

        <div className="flex flex-col space-y-4">
          <Button variant="outline">Sign In with Magic Link</Button>
          <Button variant="destructive">Sign In with Google</Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SignInContainer;
