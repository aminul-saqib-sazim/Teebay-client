import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash, Edit, ShoppingCart, Key } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadui/dropdown-menu";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadui/select";
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

  const [confirmationData, setConfirmationData] = useState<{
    productId: string;
    action: "BUY" | "RENT";
  } | null>(null);

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product", { description: parseApiErrorMessage(error) });
      }
    }
  };

  const handleBuy = (id: string) => {
    setConfirmationData({ productId: id, action: "BUY" });
  };

  const handleRent = (id: string) => {
    setConfirmationData({ productId: id, action: "RENT" });
  };

  const handleConfirmAction = async () => {
    if (!confirmationData) return;
    const { productId, action } = confirmationData;

    try {
      if (action === "BUY") {
        await buyProduct(productId).unwrap();
        toast.success("Product purchased successfully");
      } else {
        await rentProduct(productId).unwrap();
        toast.success("Product rented successfully");
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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        const isOwner = user?.id === product.owner?.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner && (
                <>
                  <DropdownMenuItem onClick={() => handleEdit(product)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </>
              )}
              {!isOwner && (
                <>
                  <DropdownMenuItem onClick={() => handleBuy(product.id)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Buy
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleRent(product.id)}>
                    <Key className="mr-2 h-4 w-4" /> Rent
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
              This will {confirmationData?.action === "BUY" ? "purchase" : "rent"} the product "
              {productsData?.data.find((p) => p.id === confirmationData?.productId)?.title}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>Confirm</AlertDialogAction>
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
        <ProductsTable data={productsData?.data || []} columns={columns} />
        {productsData?.meta && <TablePagination paginationMetadata={productsData.meta} />}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductsContainer;
