import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { DropdownMenuContent } from "@/shared/components/shadui/dropdown-menu";

const CustomMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      className,
      "border-border bg-background-secondary text-background-foreground shadow-md",
    )}
    {...props}
  />
));
CustomMenuContent.displayName = "CustomMenuContent";

export default CustomMenuContent;
