import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/shared/components/shadui/dropdown-menu";

const CustomMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={cn(
      inset && "pl-8",
      className,
      "rounded-md focus:bg-muted focus:text-background-foreground",
    )}
    {...props}
  />
));
CustomMenuItem.displayName = "CustomMenuItem";

export default CustomMenuItem;
