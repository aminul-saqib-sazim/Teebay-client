import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui/form";
import { Input } from "@/shared/components/shadui/input";
import { Textarea } from "@/shared/components/shadui/textarea";
import {
  EProductCategory,
  ERentOption,
} from "@/shared/redux/rtk-apis/products/products.interfaces";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui/select";

import { Checkbox } from "@/shared/components/shadui/checkbox";
import { IProductFormFieldsProps } from "./ProductForm.types";

const ProductFormFields: React.FC<IProductFormFieldsProps> = ({ form, isSubmitting }) => {
  return (
    <div className="grid gap-4 py-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Product Title" {...field} disabled={isSubmitting} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Product Description" {...field} disabled={isSubmitting} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rentalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rental Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Rental Price"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="rentOption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rental Option</FormLabel>
            <Select disabled={isSubmitting} onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rental option" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(ERentOption).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === ERentOption.HOURLY ? "Per Hour" : "Per Day"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantity</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Quantity" {...field} disabled={isSubmitting} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categories"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Categories</FormLabel>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(EProductCategory).map((category) => (
                <FormField
                  key={category}
                  control={form.control}
                  name="categories"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={category}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, category])
                                : field.onChange(
                                    field.value?.filter((value) => value !== category),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{category}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductFormFields;
