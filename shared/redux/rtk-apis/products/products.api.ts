import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { ICategory, IPaginatedProductsResponse, IProduct } from "./products.interfaces";
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

    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: "products/categories",
        method: "GET",
      }),
      transformResponse: (response: TApiResponse<ICategory[]>) => response.data,
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

    buyProduct: builder.mutation<void, { id: string; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `products/${id}/buy`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Products" as const, id },
        { type: "Products" as const, id: "LIST" },
      ],
    }),

    rentProduct: builder.mutation<
      void,
      { id: string; quantity: number; rentStartDate?: string; rentEndDate?: string }
    >({
      query: ({ id, quantity, rentStartDate, rentEndDate }) => ({
        url: `products/${id}/rent`,
        method: "POST",
        body: { quantity, rentStartDate, rentEndDate },
      }),
      invalidatesTags: (_result, _error, { id }) => [
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
  useGetCategoriesQuery,
} = productsApi;
