import React from "react";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadui/dialog";
import { Badge } from "@/shared/components/shadui/badge";
import { IOrder } from "@/shared/redux/rtk-apis/orders/orders.interfaces";

interface IOrderDetailsDialogProps {
  order: IOrder | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsDialog: React.FC<IOrderDetailsDialogProps> = ({
  order,
  isOpen,
  onOpenChange,
}) => {
  if (!order) return null;

  const quantity = order.quantity || 1;
  const totalPrice = (order.price * quantity).toFixed(2);
  const createdAt = format(new Date(order.createdAt), "PPp");
  const rentStartDate = order.rentStartDate ? format(new Date(order.rentStartDate), "PPP") : null;
  const rentEndDate = order.rentEndDate ? format(new Date(order.rentEndDate), "PPP") : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{order.product?.title || "Order Details"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{order.type}</Badge>
            <Badge>{order.status}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Unit Price</p>
              <p className="text-sm font-medium">${order.price}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-sm font-medium">{quantity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="text-sm font-medium">${totalPrice}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="text-sm font-medium">{createdAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Buyer</p>
              <p className="text-sm font-medium">
                {order.buyer ? `${order.buyer.firstName} ${order.buyer.lastName}` : "Unknown"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Seller</p>
              <p className="text-sm font-medium">
                {order.product?.owner
                  ? `${order.product.owner.firstName} ${order.product.owner.lastName}`
                  : "Unknown"}
              </p>
            </div>
          </div>

          {(rentStartDate || rentEndDate) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rent Start</p>
                <p className="text-sm font-medium">{rentStartDate || "-"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rent End</p>
                <p className="text-sm font-medium">{rentEndDate || "-"}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
