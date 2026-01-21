import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";

export interface IProductFormProps {
  product?: IProduct | null;
  onClose: () => void;
}
