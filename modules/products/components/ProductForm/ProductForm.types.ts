import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { ICreateProductDto } from "@/shared/typedefs/api";
import { UseFormReturn } from "react-hook-form";

export interface IProductFormProps {
  product?: IProduct | null;
  onClose: () => void;
}

export interface IProductFormFieldsProps {
  form: UseFormReturn<ICreateProductDto>;
  isSubmitting: boolean;
}
