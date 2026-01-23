import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadui/dialog";
import { Button } from "@/shared/components/shadui/button";
import { Badge } from "@/shared/components/shadui/badge";
import { IProduct, ERentOption } from "@/shared/redux/rtk-apis/products/products.interfaces";

interface IProductDetailsDialogProps {
  product: IProduct | null;
  isOpen: boolean;
  isOwner: boolean;
  onOpenChange: (open: boolean) => void;
  onBuy: (productId: string) => void;
  onRent: (productId: string) => void;
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
}

const ProductDetailsDialog: React.FC<IProductDetailsDialogProps> = ({
  product,
  isOpen,
  isOwner,
  onOpenChange,
  onBuy,
  onRent,
  onEdit,
  onDelete,
}) => {
  if (!product) return null;

  const rentLabel = product.rentOption === ERentOption.HOURLY ? "hour" : "day";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm whitespace-pre-wrap">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Purchase Price</p>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Rental Price</p>
              <p className="text-lg font-semibold">
                ${product.rentalPrice}/{rentLabel}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-sm font-medium">{product.quantity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="text-sm font-medium">
                {product.owner?.firstName
                  ? `${product.owner.firstName} ${product.owner.lastName}`
                  : "Unknown"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Categories</p>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {isOwner ? (
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <Button variant="outline" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => onDelete(product.id)}>
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <Button variant="outline" onClick={() => onRent(product.id)}>
                Rent
              </Button>
              <Button onClick={() => onBuy(product.id)}>Buy</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
