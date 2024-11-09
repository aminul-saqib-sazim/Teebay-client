import i18nConfig from "../next-i18next.config.mjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import NextHead from "@/shared/components/NextHead";
import { Button } from "@/shared/components/shadui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadui/card";
import GeneralLayout from "@/shared/layouts/GeneralLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const Home: NextApplicationPage = () => (
  <>
    <NextHead />

    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Sazim&rsquo;s NextJS + ShadCN Starter Template
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Jumpstart your next project with our beautifully designed and fully functional
                template.
              </p>
            </div>
            <div className="space-x-4">
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Features
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Responsive Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our template looks great on any device, be it a phone, tablet, or desktop.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easily customize the template to fit your brand and needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fast Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Optimized for speed to ensure your website loads quickly.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  </>
);

Home.Layout = GeneralLayout;

export default Home;

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], i18nConfig)),
    },
  };
}
