import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useQueryStates, parseAsInteger, parseAsString, parseAsFloat } from "nuqs";
import { toast } from "sonner";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Button } from "@/shared/components/shadui/button";
import { Badge } from "@/shared/components/shadui/badge";
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
import {
  IProduct,
  EProductCategory,
  EProductListingType,
} from "@/shared/redux/rtk-apis/products/products.interfaces";
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

export const PAGINATION_LIMIT_OPTIONS = [5, 10, 20, 50];

const ProductsContainer = () => {
  const [{ page, limit, category, search, listingType, minPrice, maxPrice }, setQueryStates] =
    useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
    category: parseAsString.withDefault(""),
    search: parseAsString.withDefault(""),
    listingType: parseAsString.withDefault(""),
    minPrice: parseAsFloat,
    maxPrice: parseAsFloat,
  });

  const { data: user } = useMeQuery();

  const { data: productsData, isLoading } = useGetProductsQuery({
    page,
    limit,
    search: search || undefined,
    category: (category as EProductCategory) || undefined,
    listingType: (listingType as EProductListingType) || undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
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
  const [rentStartDate, setRentStartDate] = useState("");
  const [rentEndDate, setRentEndDate] = useState("");

  const handleClearFilters = () => {
    setQueryStates({
      page: 1,
      search: "",
      category: "",
      listingType: "",
      minPrice: null,
      maxPrice: null,
    });
  };

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
    setRentStartDate("");
    setRentEndDate("");
  };

  const handleRent = (id: string) => {
    setConfirmationData({ productId: id, action: "RENT" });
    setQuantity(1);
    const today = new Date().toISOString().split("T")[0] ?? "";
    setRentStartDate(today);
    setRentEndDate("");
  };

  const handleConfirmAction = async () => {
    if (!confirmationData) return;
    const { productId, action } = confirmationData;

    try {
      if (action === "BUY") {
        await buyProduct({ id: productId, quantity }).unwrap();
        toast.success("Product purchased successfully");
      } else if (action === "RENT") {
        if (!rentStartDate) {
          toast.error("Rent start date is required");
          return;
        }
        if (rentEndDate && rentEndDate < rentStartDate) {
          toast.error("Rent end date must be on or after start date");
          return;
        }
        await rentProduct({
          id: productId,
          quantity,
          rentStartDate: rentStartDate || undefined,
          rentEndDate: rentEndDate || undefined,
        }).unwrap();
        toast.success("Product rented successfully");
      } else {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully");
      }
    } catch (error: any) {
      toast.error(`Failed to ${action.toLowerCase()} product`, {
        description: error?.data?.message || error?.message || "Something went wrong",
      });
    } finally {
      setConfirmationData(null);
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const isOwner = user?.id === row.original.owner?.id;

        return (
          <div className="flex items-center gap-2">
            <span>{row.original.title}</span>
            {isOwner && <Badge variant="secondary">My Product</Badge>}
          </div>
        );
      },
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
      cell: ({ row }) => {
        const isOwner = user?.id === row.original.owner?.id;

        if (isOwner) {
          return <span className="font-semibold text-primary">Me</span>;
        }

        return row.original.owner?.firstName
          ? `${row.original.owner.firstName} ${row.original.owner.lastName}`
          : "Unknown";
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
                    {confirmationData?.action === "BUY"
                      ? "Are you want to buy this product?"
                      : "Are you want to rent this product?"}
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
                  {confirmationData?.action === "RENT" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rentStart">From</Label>
                        <Input
                          id="rentStart"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={rentStartDate}
                          onChange={(e) => {
                            setRentStartDate(e.target.value);
                            if (rentEndDate && e.target.value > rentEndDate) {
                              setRentEndDate("");
                            }
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rentEnd">To</Label>
                        <Input
                          id="rentEnd"
                          type="date"
                          min={rentStartDate || new Date().toISOString().split("T")[0]}
                          value={rentEndDate}
                          onChange={(e) => setRentEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-700">
              {confirmationData?.action === "DELETE" ? "Cancel" : "No"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={
                confirmationData?.action === "DELETE"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }
            >
              {confirmationData?.action === "DELETE" ? "Confirm" : "Yes"}
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

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>Add Product</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setQueryStates({ search: e.target.value, page: 1 })}
              className="w-[220px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
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

          <div className="flex flex-col gap-2">
            <Label>Listing Type</Label>
            <Select
              value={listingType}
              onValueChange={(value) => {
                setQueryStates({ listingType: value === "all" ? "" : value, page: 1 });
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(EProductListingType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              min={0}
              placeholder="0"
              value={minPrice ?? ""}
              onChange={(e) =>
                setQueryStates({
                  minPrice: e.target.value === "" ? null : Number(e.target.value),
                  page: 1,
                })
              }
              className="w-[120px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              min={0}
              placeholder="0"
              value={maxPrice ?? ""}
              onChange={(e) =>
                setQueryStates({
                  maxPrice: e.target.value === "" ? null : Number(e.target.value),
                  page: 1,
                })
              }
              className="w-[120px]"
            />
          </div>
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
