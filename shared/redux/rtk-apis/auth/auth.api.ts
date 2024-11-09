import { TApiResponse } from "@/shared/typedefs";
import { ISelfRegisterUserDto, ISignInResponse, IUserResponse } from "@/shared/typedefs/api";

import projectApi from "../api.config";
import { TSignInRequestFields } from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<IUserResponse, ISelfRegisterUserDto>({
      query: (data) => ({
        url: "auth/sign-up",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<IUserResponse>) => response.data,
    }),

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

export const { useSignInMutation, useSignUpMutation } = authApi;
