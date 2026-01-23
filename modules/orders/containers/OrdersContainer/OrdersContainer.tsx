import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import FullPageLoadingSpinner from "@/shared/components/FullPageLoadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/shadui/tabs";
import { ScrollArea, ScrollBar } from "@/shared/components/shadui/scroll-area";

import { useGetMyOrdersQuery, useGetMySalesQuery } from "@/shared/redux/rtk-apis/orders/orders.api";
import { IOrder, EOrderType } from "@/shared/redux/rtk-apis/orders/orders.interfaces";

import OrdersTable from "../../components/OrdersTable";

const OrdersContainer = () => {
  const { data: myOrders, isLoading: isLoadingOrders } = useGetMyOrdersQuery();
  const { data: mySales, isLoading: isLoadingSales } = useGetMySalesQuery();

  const boughtProducts = useMemo(
    () => myOrders?.filter((o) => o.type === EOrderType.BUY) || [],
    [myOrders],
  );

  const borrowedProducts = useMemo(
    () => myOrders?.filter((o) => o.type === EOrderType.RENT) || [],
    [myOrders],
  );

  const soldProducts = useMemo(
    () => mySales?.filter((o) => o.type === EOrderType.BUY) || [],
    [mySales],
  );

  const lentProducts = useMemo(
    () => mySales?.filter((o) => o.type === EOrderType.RENT) || [],
    [mySales],
  );

  const getColumns = (type: "BUY" | "SELL"): ColumnDef<IOrder>[] => [
    {
      accessorKey: "product.title",
      header: "Title",
    },
    {
      accessorKey: "price",
      header: "Unit Price",
      cell: ({ row }: { row: { original: IOrder } }) => `$${row.original.price}`,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }: { row: { original: IOrder } }) => row.original.quantity || 1,
    },
    {
      id: "totalPrice",
      header: "Total Price",
      cell: ({ row }: { row: { original: IOrder } }) => {
        const { price, quantity = 1 } = row.original;
        return `$${(price * quantity).toFixed(2)}`;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: { row: { original: IOrder } }) =>
        format(new Date(row.original.createdAt), "PPp"),
    },
    ...(type === "BUY"
      ? [
        {
          accessorKey: "product.owner",
          header: "Seller",
          cell: ({ row }: { row: { original: IOrder } }) => {
            const owner = row.original.product?.owner;
            return owner ? `${owner.firstName} ${owner.lastName}` : "Unknown";
          },
        },
      ]
      : [
        {
          accessorKey: "buyer",
          header: "Buyer",
          cell: ({ row }: { row: { original: IOrder } }) => {
            const buyer = row.original.buyer;
            return buyer ? `${buyer.firstName} ${buyer.lastName}` : "Unknown";
          },
        },
      ]),
  ];

  if (isLoadingOrders || isLoadingSales) {
    return <FullPageLoadingSpinner />;
  }

  return (
    <div className="container py-6">
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
      </div>

      <Tabs defaultValue="bought" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bought">Bought</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
          <TabsTrigger value="lent">Lent</TabsTrigger>
        </TabsList>

        <TabsContent value="bought">
          <ScrollArea>
            <OrdersTable data={boughtProducts} columns={getColumns("BUY")} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="sold">
          <ScrollArea>
            <OrdersTable data={soldProducts} columns={getColumns("SELL")} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="borrowed">
          <ScrollArea>
            <OrdersTable data={borrowedProducts} columns={getColumns("BUY")} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="lent">
          <ScrollArea>
            <OrdersTable data={lentProducts} columns={getColumns("SELL")} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersContainer;
