import { TApiResponse } from "@/shared/typedefs";
import { IUserProfileResponse, IUpdateUserProfileDto } from "@/shared/typedefs/api";

import projectApi from "../api.config";

const usersApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUserProfileResponse, void>({
      query: () => "user-profiles/me",
      transformResponse: (response: TApiResponse<IUserProfileResponse>) => response.data,
      providesTags: ["UserProfile"],
    }),

    updateUserProfile: builder.mutation<IUserProfileResponse, IUpdateUserProfileDto>({
      query: (body) => ({
        url: "user-profiles/me",
        method: "PATCH",
        body,
      }),
      transformResponse: (response: TApiResponse<IUserProfileResponse>) => response.data,
      invalidatesTags: ["UserProfile"],
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = usersApi;
