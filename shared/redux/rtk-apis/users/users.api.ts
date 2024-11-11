import { TApiResponse } from "@/shared/typedefs";
import {
  ISuperuserFindAllUserResponse,
  IFindAllUsersParams,
  ITokenizedUser,
  IUserResponse,
  IRegisterUserDto,
} from "@/shared/typedefs/api";

import projectApi from "../api.config";
import { TUpdateUserAsSuperuserParams } from "./users.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<ITokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<ITokenizedUser>) => response.data,
    }),

    getUsers: builder.query<ISuperuserFindAllUserResponse, Partial<IFindAllUsersParams>>({
      query: (params) => ({
        url: "users",
        method: "GET",
        params,
      }),
      transformResponse: (response: TApiResponse<ISuperuserFindAllUserResponse>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "Users" as const, id: "LIST" },
            ]
          : [{ type: "Users" as const, id: "LIST" }],
    }),

    updateUser: builder.mutation<IUserResponse, TUpdateUserAsSuperuserParams>({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: TApiResponse<IUserResponse>) => response.data,
      invalidatesTags: (result, _, __) => [{ type: "User" as const, id: result?.id }],
    }),

    createUser: builder.mutation<IUserResponse, IRegisterUserDto>({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<IUserResponse>) => response.data,
      invalidatesTags: [{ type: "Users" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
} = usersApi;
