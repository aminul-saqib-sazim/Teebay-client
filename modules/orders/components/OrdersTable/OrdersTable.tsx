import { useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadui/table";
import { TOrdersTableProps } from "./OrdersTable.types";

const OrdersTable = ({ data, columns }: TOrdersTableProps) => {
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader className="bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center h-24">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
