import React, { FC } from "react";

import { Button } from "../../shadui/button";
import { ICustomButtonProps } from "./CustomButton.types";

const CustomButton: FC<ICustomButtonProps> = ({
  type = "button",
  children,
  disabled = false,
  variant,
  ...props
}) => (
  <Button
    variant={variant}
    className="w-full font-normal rounded-[4px]"
    type={type}
    disabled={disabled}
    {...props}
  >
    {children}
  </Button>
);

export default CustomButton;
