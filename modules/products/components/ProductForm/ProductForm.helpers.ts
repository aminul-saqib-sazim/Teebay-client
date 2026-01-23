import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  EProductCategory,
  ERentOption,
  IProduct,
} from "@/shared/redux/rtk-apis/products/products.interfaces";
import { ICreateProductDto } from "@/shared/typedefs/api";

export const getProductFormInitialValues = (product?: IProduct): ICreateProductDto => ({
  title: product?.title || "",
  description: product?.description || "",
  price: product?.price || 0,
  rentalPrice: product?.rentalPrice || 0,
  rentOption: product?.rentOption || ERentOption.DAILY,
  quantity: product?.quantity || 1,
  categories: product?.categories || [],
});

export const productFormValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess((val) => Number(val), z.number().min(0, "Price must be positive")),
  rentalPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Rental price must be positive"),
  ),
  rentOption: z.nativeEnum(ERentOption).optional(),
  quantity: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1, "Quantity must be at least 1"),
  ),
  categories: z.array(z.nativeEnum(EProductCategory)).min(1, "At least one category is required"),
});

export const productFormResolver = zodResolver(productFormValidationSchema);
