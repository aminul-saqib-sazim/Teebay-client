import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";
import { toast } from "sonner";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Button } from "@/shared/components/shadui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/shadui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/shared/components/shadui/scroll-area";
import TablePagination from "@/shared/components/Table/TablePagination";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useBuyProductMutation,
  useRentProductMutation,
} from "@/shared/redux/rtk-apis/products/products.api";
import { IProduct, EProductCategory } from "@/shared/redux/rtk-apis/products/products.interfaces";
import { useMeQuery } from "@/shared/redux/rtk-apis/users/users.api";

import ProductsTable from "../../components/ProductsTable";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductDetailsDialog from "../../components/ProductDetailsDialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui/select";
import { Input } from "@/shared/components/shadui/input";
import { Label } from "@/shared/components/shadui/label";
import { parseApiErrorMessage } from "@/shared/utils/errors";

export const PAGINATION_LIMIT_OPTIONS = [5, 10, 20, 50];

const ProductsContainer = () => {
  const [{ page, limit, category }, setQueryStates] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    category: parseAsString.withDefault(""),
  });

  const { data: user } = useMeQuery();

  const { data: productsData, isLoading } = useGetProductsQuery({
    page,
    limit,
    category: (category as EProductCategory) || undefined,
  });

  const [deleteProduct] = useDeleteProductMutation();
  const [buyProduct] = useBuyProductMutation();
  const [rentProduct] = useRentProductMutation();

  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState<IProduct | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [confirmationData, setConfirmationData] = useState<{
    productId: string;
    action: "BUY" | "RENT" | "DELETE";
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleOpenDetails = (product: IProduct) => {
    setDetailsProduct(product);
    setIsDetailsOpen(true);
  };

  const handleDelete = async (id: string) => {
    setConfirmationData({ productId: id, action: "DELETE" });
  };

  const handleBuy = (id: string) => {
    setConfirmationData({ productId: id, action: "BUY" });
    setQuantity(1);
  };

  const handleRent = (id: string) => {
    setConfirmationData({ productId: id, action: "RENT" });
    setQuantity(1);
  };

  const handleConfirmAction = async () => {
    if (!confirmationData) return;
    const { productId, action } = confirmationData;

    try {
      if (action === "BUY") {
        await buyProduct({ id: productId, quantity }).unwrap();
        toast.success("Product purchased successfully");
      } else if (action === "RENT") {
        await rentProduct({ id: productId, quantity }).unwrap();
        toast.success("Product rented successfully");
      } else {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} product`, {
        description: parseApiErrorMessage(error),
      });
    } finally {
      setConfirmationData(null);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price}`,
    },
    {
      accessorKey: "rentalPrice",
      header: "Rental Price",
      cell: ({ row }) => {
        const { rentalPrice, rentOption } = row.original;
        const optionLabel = rentOption === "HOURLY" ? "hour" : "day";
        return `$${rentalPrice}/${optionLabel}`;
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "categories",
      header: "Categories",
      cell: ({ row }) => row.original.categories.join(", "),
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) =>
        row.original.owner?.firstName
          ? `${row.original.owner.firstName} ${row.original.owner.lastName}`
          : "Unknown",
    },
  ];

  if (isLoading) {
    return <FullPageLoadingSpinner />;
  }

  return (
    <div className="container py-6">
      <AlertDialog
        open={!!confirmationData}
        onOpenChange={(open) => !open && setConfirmationData(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationData?.action === "DELETE" ? (
                <>
                  This will permanently delete the product "
                  <span className="font-semibold">
                    {productsData?.data.find((p) => p.id === confirmationData?.productId)?.title}
                  </span>
                  ". This action cannot be undone.
                </>
              ) : (
                <div className="space-y-4 pt-2">
                  <p>
                    This will {confirmationData?.action === "BUY" ? "purchase" : "rent"} the product "
                    <span className="font-semibold">
                      {productsData?.data.find((p) => p.id === confirmationData?.productId)?.title}
                    </span>
                    " for{" "}
                    <span className="font-semibold">
                      $
                      {confirmationData?.action === "BUY"
                        ? productsData?.data.find((p) => p.id === confirmationData?.productId)
                          ?.price
                        : productsData?.data.find((p) => p.id === confirmationData?.productId)
                          ?.rentalPrice}
                    </span>
                    {confirmationData?.action === "RENT" &&
                      ` per ${productsData?.data.find((p) => p.id === confirmationData?.productId)?.rentOption === "HOURLY" ? "hour" : "day"}`}
                    . This action cannot be undone.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={productsData?.data.find((p) => p.id === confirmationData?.productId)?.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={confirmationData?.action === "DELETE" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ProductDialog
        isOpen={isDialogOpen}
        onOpenChange={(open: boolean) => {
          setIsDialogOpen(open);
          if (!open) setSelectedProduct(undefined);
        }}
        product={selectedProduct}
      />

      <ProductDetailsDialog
        product={detailsProduct}
        isOpen={isDetailsOpen}
        isOwner={!!detailsProduct && user?.id === detailsProduct.owner?.id}
        onOpenChange={(open) => {
          setIsDetailsOpen(open);
          if (!open) setDetailsProduct(null);
        }}
        onBuy={(productId) => {
          handleBuy(productId);
          setIsDetailsOpen(false);
        }}
        onRent={(productId) => {
          handleRent(productId);
          setIsDetailsOpen(false);
        }}
        onEdit={(product) => {
          handleEdit(product);
          setIsDetailsOpen(false);
        }}
        onDelete={(productId) => {
          handleDelete(productId);
          setIsDetailsOpen(false);
        }}
      />

      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-4">
          <Button onClick={() => setIsDialogOpen(true)}>Add Product</Button>

          <Select
            value={category}
            onValueChange={(value) => {
              setQueryStates({ category: value === "all" ? "" : value, page: 1 });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.values(EProductCategory).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea>
        <ProductsTable
          data={productsData?.data || []}
          columns={columns}
          onRowClick={handleOpenDetails}
        />
        {productsData?.meta && <TablePagination paginationMetadata={productsData.meta} />}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductsContainer;
