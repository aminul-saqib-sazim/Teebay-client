export type TComboBoxOption = {
  icon?: React.ReactNode;
  value: string;
  label: string;
};

export type TComboBoxProps = {
  options: TComboBoxOption[];
  placeholder: React.ReactNode;
  triggerLeftIcon?: React.ReactNode;
  triggerRightIcon?: React.ReactNode | "none";
  buttonSize?: "sm" | "default" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassname?: string;
  dropdownClassname?: string;
  dropdownPosition?: "start" | "center" | "end";
  dropdownOffset?: number;
  menuWidth?: number;
  disabled?: boolean;
  isActionButton?: boolean;
  popoverSameAsTriggerWidth?: boolean;
  onChange: (value: string) => void;
};
