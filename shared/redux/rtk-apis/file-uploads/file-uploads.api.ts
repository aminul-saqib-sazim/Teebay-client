import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TPresignedFileUrl, TPresignedUrlFileDto } from "./file-uploads.types";

const fileUploadApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getPresignedUrl: builder.mutation<TPresignedFileUrl[], TPresignedUrlFileDto>({
      query: (files) => ({
        url: `file-uploads`,
        method: "POST",
        body: { files },
      }),
      transformResponse: (response: TApiResponse<TPresignedFileUrl[]>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetPresignedUrlMutation } = fileUploadApi;
