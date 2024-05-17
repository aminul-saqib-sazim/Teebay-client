import React from "react";

import { Button } from "@/shared/components/shadui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../shadui/dropdown-menu";
import { TCustomCheckboxDropdownProps } from "./CustomCheckboxDropdown.types";

const CustomCheckboxDropdown: React.FC<TCustomCheckboxDropdownProps> = ({
  placeholder,
  options,
  dropdownPosition = "center",
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="text-background-secondary-foreground">
        {placeholder}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 bg-background-secondary" align={dropdownPosition}>
      {options.map((option, index) => (
        <DropdownMenuCheckboxItem
          className="focus:bg-muted"
          key={index}
          checked={option.checked}
          onCheckedChange={option.onSelect}
        >
          {option.label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default CustomCheckboxDropdown;
