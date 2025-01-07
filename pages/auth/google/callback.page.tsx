import GoogleCallbackContainer from "@/modules/auth/google/containers";
import NextHead from "@/shared/components/NextHead";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const Callback: NextApplicationPage = () => (
  <>
    <NextHead />
    <GoogleCallbackContainer />
  </>
);

Callback.Layout = GeneralLayout;

export default Callback;
