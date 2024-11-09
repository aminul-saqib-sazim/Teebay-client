import SignUpContainer from "@/modules/sign-up/containers";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const SignUpPage: NextApplicationPage = () => <SignUpContainer />;

SignUpPage.Layout = GeneralLayout;

export default SignUpPage;
