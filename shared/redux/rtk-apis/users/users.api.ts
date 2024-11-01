import { TApiResponse } from "@/shared/typedefs";
import { ITokenizedUser } from "@/shared/typedefs/api";

import projectApi from "../api.config";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<ITokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<ITokenizedUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery } = usersApi;
