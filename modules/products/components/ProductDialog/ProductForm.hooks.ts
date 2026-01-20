import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/shared/redux/rtk-apis/products/products.api";
import { ICreateProductDto, IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { getProductFormInitialValues, productFormResolver } from "./ProductForm.helpers";

interface IUseProductFormProps {
  product?: IProduct | null;
  onClose: () => void;
}

export const useProductForm = ({ product, onClose }: IUseProductFormProps) => {
  const form = useForm<ICreateProductDto>({
    defaultValues: getProductFormInitialValues(product || undefined),
    resolver: productFormResolver,
  });

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    form.reset(getProductFormInitialValues(product || undefined));
  }, [product, form]);

  const onSubmit = async (values: ICreateProductDto) => {
    try {
      if (product) {
        await updateProduct({ id: product.id, ...values }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(values).unwrap();
        toast.success("Product created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(product ? "Failed to update product" : "Failed to create product", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };

  return { form, onSubmit, isSubmitting: isCreating || isUpdating };
};
