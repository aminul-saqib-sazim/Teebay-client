import { TApiResponse } from "@/shared/typedefs";
import {
  IForgotPasswordDto,
  ISelfRegisterUserDto,
  ISendForgotPasswordEmailResponse,
  ISignInResponse,
  IUserResponse,
} from "@/shared/typedefs/api";

import projectApi from "../api.config";
import { TRequestPasswordFields, TSignInRequestFields } from "./auth.types";

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

    forgotPassword: builder.mutation<ISendForgotPasswordEmailResponse, IForgotPasswordDto>({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<ISendForgotPasswordEmailResponse>) =>
        response.data,
    }),

    resetPassword: builder.mutation<IUserResponse, TRequestPasswordFields>({
      query: ({ token, password }) => ({
        url: `auth/reset-password/${token}`,
        method: "POST",
        body: { password },
      }),
      transformResponse: (response: TApiResponse<IUserResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
