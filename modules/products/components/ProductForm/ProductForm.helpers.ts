import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ERentOption, IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { ICreateProductDto } from "@/shared/typedefs/api";

// Convert category name to uppercase and replace spaces with underscores
export const mapCategoryNameToEnum = (categoryName: string): string => {
  return categoryName.toUpperCase().replace(/\s+/g, "_");
};

// Convert enum value back to readable format (replace underscores with spaces and title case)
export const mapEnumToCategoryName = (enumValue: string): string => {
  return enumValue.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

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
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export const productFormResolver = zodResolver(productFormValidationSchema);
