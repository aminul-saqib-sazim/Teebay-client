import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadui/dialog";
import { Button } from "@/shared/components/shadui/button";
import { Form } from "@/shared/components/shadui/form";
import { IProduct, ERentOption } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { useProductForm } from "./ProductForm.hooks";
import ProductFormFields from "./ProductFormFields";

interface IProductDialogProps {
  product?: IProduct | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDialog: React.FC<IProductDialogProps> = ({ product, isOpen, onOpenChange }) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const { form, onSubmit, isSubmitting } = useProductForm({
    product,
    onClose: () => {
      onOpenChange(false);
      setShowPreview(false);
    },
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    if (isValid) {
      setShowPreview(true);
    }
  };

  const handleConfirm = form.handleSubmit(onSubmit);

  const values = form.getValues();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setShowPreview(false);
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showPreview
              ? "Confirm Product Details"
              : product
                ? "Edit Product"
                : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        {showPreview ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Title</h4>
                <p className="text-sm">{values.title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Categories</h4>
                <p className="text-sm">{values.categories.join(", ")}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
              <p className="text-sm whitespace-pre-wrap">{values.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Purchase Price</h4>
                <p className="text-sm">${values.price}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Rental Price</h4>
                <p className="text-sm">${values.rentalPrice}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Rental Option</h4>
                <p className="text-sm">
                  {values.rentOption === ERentOption.HOURLY ? "Per Hour" : "Per Day"}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
              <p className="text-sm">{values.quantity}</p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowPreview(false)}>
                Back to Edit
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : product ? "Confirm Changes" : "Confirm & Create"}
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleNext}>
              <ProductFormFields form={form} isSubmitting={isSubmitting} />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Preview Information</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
