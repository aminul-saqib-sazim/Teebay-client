import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TTokenizedUser } from "../auth/auth.types";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<TTokenizedUser, void>({
      query: () => "users/me",
      transformResponse: (response: TApiResponse<TTokenizedUser>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useLazyMeQuery } = usersApi;
