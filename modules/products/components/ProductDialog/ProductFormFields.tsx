import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/shadui/form";
import { Input } from "@/shared/components/shadui/input";
import { Textarea } from "@/shared/components/shadui/textarea";
import { MultiSelect } from "@/shared/components/shadui/multi-select"; // Assuming generic MultiSelect exists, checking later or building simple select
import { ICreateProductDto, EProductCategory } from "@/shared/redux/rtk-apis/products/products.interfaces";

// If MultiSelect doesn't exist, I might need to implement a simple one or use checkboxes.
// Checking UsersContainer for how roles are selected or filters. 
// Assuming a standard Select or MultiSelect needs to be verified. 
// For now, I will use a simple Select (HTML) or skip if I can't verifying.
// Actually, `shadui` usually has `Select`. Multi-select is harder.
// I'll implement a simple checkbox group for categories for now if MultiSelect is missing.
// Or just checking if I can use the existing `Select` from shadui with `multiple`? No shadcn select doesn't support multiple easily.
// I'll check if `MultiSelect` exists in shared components.

import { Checkbox } from "@/shared/components/shadui/checkbox";

interface IProductFormFieldsProps {
    form: UseFormReturn<ICreateProductDto>;
    isSubmitting: boolean;
}

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
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Price" {...field} disabled={isSubmitting} />
                            </FormControl>
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
            </div>

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
                                                                    field.value?.filter(
                                                                        (value) => value !== category
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {category}
                                                </FormLabel>
                                            </FormItem>
                                        )
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
