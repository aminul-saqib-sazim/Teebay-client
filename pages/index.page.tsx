import i18nConfig from "../next-i18next.config.mjs";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LanguageSelector } from "@/shared/components/LanguageSelector";
import NextHead from "@/shared/components/NextHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/shadui/accordion";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <NextHead />

      <div className="flex justify-center items-center h-screen">
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold">NextJS ShadUI Template</h1>
          <div className="w-4/5">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is this template ready with all necessary libraries installed?
                </AccordionTrigger>
                <AccordionContent>Yes.</AccordionContent>
              </AccordionItem>
            </Accordion>

            <hr />
            <h3 className="text-xl font-bold">Translations</h3>
            <LanguageSelector />
            <p>{t("hello")}</p>
            <p>{t("variableWithCount", { count: 3 })}</p>

            <Trans
              i18nKey="transComponent"
              components={{
                bold: <strong />,
                italic: <em />,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], i18nConfig)),
    },
  };
}
