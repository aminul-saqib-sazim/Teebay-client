import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadui/card";

import SignUpForm from "../components/SignUpForm";

const SignUpContainer = () => (
  <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  </div>
);

export default SignUpContainer;
