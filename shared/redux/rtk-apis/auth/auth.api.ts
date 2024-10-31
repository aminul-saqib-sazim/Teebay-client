import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TSignInRequestFields, TSignInResponse } from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<TSignInResponse, TSignInRequestFields>({
      query: (data) => ({
        url: "auth/sign-in",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TSignInResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = authApi;
