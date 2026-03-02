import React from "react";
import { Form } from "@/shared/components/shadui/form";
import { Button } from "@/shared/components/shadui/button";
import { useProductForm } from "./ProductForm.hooks";
import ProductFormFields from "./ProductFormFields";
import { IProductFormProps } from "./ProductForm.types";

const ProductForm: React.FC<IProductFormProps> = ({ product, onClose }) => {
  const { form, onSubmit, isSubmitting } = useProductForm({
    product,
    onClose,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ProductFormFields form={form} isSubmitting={isSubmitting} />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {product ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
