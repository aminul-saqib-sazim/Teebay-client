import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EProductCategory,
  ICreateProductDto,
  IProduct,
} from "@/shared/redux/rtk-apis/products/products.interfaces";

export const getProductFormInitialValues = (product?: IProduct): ICreateProductDto => ({
  title: product?.title || "",
  description: product?.description || "",
  price: product?.price || 0,
  quantity: product?.quantity || 1,
  categories: product?.categories || [],
});

export const productFormValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Quantity must be at least 1"),
  ),
  categories: z.array(z.nativeEnum(EProductCategory)).min(1, "At least one category is required"),
});

export const productFormResolver = zodResolver(productFormValidationSchema);
