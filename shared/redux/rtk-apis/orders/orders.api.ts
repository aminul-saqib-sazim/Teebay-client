import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { IOrder } from "./orders.interfaces";

const ordersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<IOrder[], void>({
      query: () => ({
        url: "orders/my-orders",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse<IOrder[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Orders" as const, id })),
              { type: "Orders" as const, id: "LIST_MY_ORDERS" },
            ]
          : [{ type: "Orders" as const, id: "LIST_MY_ORDERS" }],
    }),

    getMySales: builder.query<IOrder[], void>({
      query: () => ({
        url: "orders/my-sales",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse<IOrder[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Orders" as const, id })),
              { type: "Orders" as const, id: "LIST_MY_SALES" },
            ]
          : [{ type: "Orders" as const, id: "LIST_MY_SALES" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyOrdersQuery, useGetMySalesQuery } = ordersApi;
