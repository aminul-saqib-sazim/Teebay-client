import { TApiResponse } from "@/shared/typedefs";
import { IPresignedUrlFile, IPresignedUrlFileDto } from "@/shared/typedefs/api";

import projectApi from "../api.config";

const fileUploadApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getPresignedUrl: builder.mutation<IPresignedUrlFile[], IPresignedUrlFileDto>({
      query: (files) => ({
        url: `file-uploads`,
        method: "POST",
        body: { files },
      }),
      transformResponse: (response: TApiResponse<IPresignedUrlFile[]>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPresignedUrlMutation } = fileUploadApi;
