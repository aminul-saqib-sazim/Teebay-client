import CustomLink from "@/shared/components/CustomLink/CustomLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadui/card";
import { Separator } from "@/shared/components/shadui/separator";

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

        <div className="flex items-center justify-center gap-1 mt-4">
          <p>Already have an account?</p>
          <CustomLink href="/sign-in" label="Sign In" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SignUpContainer;
