import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { Checkbox } from "../../shadui/checkbox";

type CheckBoxInputProps = React.ComponentPropsWithoutRef<typeof Checkbox>;

const CheckBoxInput = forwardRef<HTMLButtonElement, CheckBoxInputProps>(
  ({ className, ...props }, ref) => (
    <Checkbox
      className={cn("rounded-[2px] border-input", className)}
      {...props}
      {...(ref as React.Ref<HTMLButtonElement>)}
    />
  ),
);

CheckBoxInput.displayName = "CheckBoxInput";

export default CheckBoxInput;
