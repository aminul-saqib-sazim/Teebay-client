import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/shadui/dialog";
import { Button } from "@/shared/components/shadui/button";
import { Form } from "@/shared/components/shadui/form";
import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { useProductForm } from "./ProductForm.hooks";
import ProductFormFields from "./ProductFormFields";

interface IProductDialogProps {
    product?: IProduct | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProductDialog: React.FC<IProductDialogProps> = ({ product, isOpen, onOpenChange }) => {
    const { form, onSubmit, isSubmitting } = useProductForm({
        product,
        onClose: () => onOpenChange(false)
    });

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ProductFormFields form={form} isSubmitting={isSubmitting} />
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {product ? "Save Changes" : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;
