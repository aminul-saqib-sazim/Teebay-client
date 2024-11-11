import { TApiResponse } from "@/shared/typedefs";
import { IRoleResponse } from "@/shared/typedefs/api";

import projectApi from "../api.config";

const rolesApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query<IRoleResponse[], void>({
      query: () => "/roles",
      transformResponse: (response: TApiResponse<IRoleResponse[]>) => response.data,
    }),
  }),
});

export const { useGetAllRolesQuery } = rolesApi;
