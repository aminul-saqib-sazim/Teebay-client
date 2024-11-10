import ForgotPasswordContainer from "@/modules/forgot-password/containers";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const ForgotPasswordPage: NextApplicationPage = () => <ForgotPasswordContainer />;

ForgotPasswordPage.Layout = GeneralLayout;

export default ForgotPasswordPage;
