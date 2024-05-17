import NextHead from "@/shared/components/NextHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/shadui/accordion";

export default function Home() {
  return (
    <>
      <NextHead />

      <div className="flex justify-center items-center h-screen ">
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
          </div>
        </div>
      </div>
    </>
  );
}
