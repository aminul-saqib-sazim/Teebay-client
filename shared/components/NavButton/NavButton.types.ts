import { ICustomButtonProps } from "@/shared/components/Form/CustomButton/CustomButton.types";

export interface INavButtonProps extends ICustomButtonProps {
  badgeValue?: string | number;
  icon?: React.ReactNode;
  active: boolean;
  className?: string;
  isNested?: boolean;
}
