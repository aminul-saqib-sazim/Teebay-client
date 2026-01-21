import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { IPaginatedProductsResponse, IProduct } from "./products.interfaces";
import { ICreateProductDto, IGetProductsParams, IUpdateProductDto } from "@/shared/typedefs/api";

const productsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IPaginatedProductsResponse, IGetProductsParams>({
      query: (params) => ({
        url: "products",
        method: "GET",
        params,
      }),
      transformResponse: (
        response: TApiResponse<{ products: IProduct[]; total: number }>,
        _meta,
        params,
      ): IPaginatedProductsResponse => {
        const { products, total } = response.data;
        const limit = params.limit || 10;
        const page = params.page || 1;
        const totalPages = Math.ceil(total / limit);

        return {
          data: products,
          meta: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products" as const, id: "LIST" },
            ]
          : [{ type: "Products" as const, id: "LIST" }],
    }),

    createProduct: builder.mutation<IProduct, ICreateProductDto>({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<IProduct>) => response.data,
      invalidatesTags: [{ type: "Products" as const, id: "LIST" }],
    }),

    updateProduct: builder.mutation<IProduct, IUpdateProductDto & { id: string }>({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TApiResponse<IProduct>) => response.data,
      invalidatesTags: (result) => [
        { type: "Products" as const, id: result?.id },
        { type: "Products" as const, id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Products" as const, id },
        { type: "Products" as const, id: "LIST" },
      ],
    }),

    buyProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}/buy`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Products" as const, id },
        { type: "Products" as const, id: "LIST" },
      ],
    }),

    rentProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}/rent`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Products" as const, id },
        { type: "Products" as const, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBuyProductMutation,
  useRentProductMutation,
} = productsApi;
