import { TApiResponse } from "@/shared/typedefs";
import { ISignInResponse } from "@/shared/typedefs/api";

import projectApi from "../api.config";
import { TSignInRequestFields } from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ISignInResponse, TSignInRequestFields>({
      query: (data) => ({
        url: "auth/sign-in",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<ISignInResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = authApi;
