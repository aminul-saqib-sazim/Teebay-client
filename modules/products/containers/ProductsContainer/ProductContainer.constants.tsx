import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/shadui/badge";
import { IProduct } from "@/shared/redux/rtk-apis/products/products.interfaces";

export const PAGINATION_LIMIT_OPTIONS = [5, 10, 20, 50];

export const getProductColumns = (user?: any): ColumnDef<IProduct>[] => [
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
