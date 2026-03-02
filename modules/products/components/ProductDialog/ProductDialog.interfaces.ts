import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";

export interface IProductDialogProps {
  product?: IProduct | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
