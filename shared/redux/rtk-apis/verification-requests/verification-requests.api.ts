import { TApiResponse } from "@/shared/typedefs";
import {
  IFindOneVerificationRequestParams,
  IVerificationRequestResponse,
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
  }),
});

export const { useFindOneVerificationRequestQuery } = verificationRequestsApi;
