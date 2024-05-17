import * as AccordionPrimitive from "@radix-ui/react-accordion";

export interface ICustomAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  rotatableIcon?: React.ReactNode;
}
