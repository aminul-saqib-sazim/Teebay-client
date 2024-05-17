import { ButtonProps } from "../../shadui/button";

export interface ICustomButtonProps extends ButtonProps {
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
}
