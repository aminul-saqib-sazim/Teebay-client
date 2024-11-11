import { TApiResponse } from "@/shared/typedefs";
import {
  IFindOneVerificationRequestParams,
  IVerificationRequestResponse,
  IVerifyByTokenResponse,
  IVerifyParams,
} from "@/shared/typedefs/api";

import projectApi from "../api.config";

const verificationRequestsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    findOneVerificationRequest: builder.query<
      IVerificationRequestResponse,
      IFindOneVerificationRequestParams
    >({
      query: ({ token, type }) => ({
        url: `verification-requests/${token}`,
        method: "GET",
        params: { type },
      }),
      transformResponse: (response: TApiResponse<IVerificationRequestResponse>) => response.data,
    }),

    verifyToken: builder.mutation<IVerifyByTokenResponse, IVerifyParams>({
      query: ({ token, type }) => ({
        url: `verification-requests/verify/${token}`,
        method: "POST",
        params: { type },
      }),
      transformResponse: (response: TApiResponse<IVerifyByTokenResponse>) => response.data,
    }),
  }),
});

export const { useFindOneVerificationRequestQuery, useVerifyTokenMutation } =
  verificationRequestsApi;
