import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { ICheckPermissionsRequest, ICheckPermissionsResponse } from "./permissions.interfaces";

const permissionsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    checkPermissions: builder.query<ICheckPermissionsResponse, ICheckPermissionsRequest>({
      query: (body) => ({
        url: "permissions/check",
        method: "POST",
        body,
      }),
      transformResponse: (response: TApiResponse<ICheckPermissionsResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useCheckPermissionsQuery } = permissionsApi;
