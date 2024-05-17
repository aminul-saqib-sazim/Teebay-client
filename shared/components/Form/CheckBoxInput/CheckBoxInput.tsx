import { forwardRef } from "react";

import { CheckboxProps } from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";

import { Checkbox } from "../../shadui/checkbox";

const CheckBoxInput = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <Checkbox className={cn("rounded-[2px] border-input", className)} {...props} {...ref} />
  ),
);

CheckBoxInput.displayName = "CheckBoxInput";

export default CheckBoxInput;
