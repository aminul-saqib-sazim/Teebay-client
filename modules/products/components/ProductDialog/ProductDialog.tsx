import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadui/dialog";
import { IProductDialogProps } from "./ProductDialog.interfaces";
import ProductForm from "../ProductForm";

const ProductDialog: React.FC<IProductDialogProps> = ({ product, isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <ProductForm product={product} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
