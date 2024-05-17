import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { API_BASE_URL } from "@/shared/constants/env.constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)?.replace(/"/g, "");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export default baseQuery;
