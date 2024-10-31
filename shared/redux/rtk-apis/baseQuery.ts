import Router from "next/router";

import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { API_BASE_URL } from "@/shared/constants/env.constants";
import { SIGN_IN_ROUTE } from "@/shared/constants/routes.constants";
import { TOAST_MESSAGE_SESSION_EXPIRED } from "@/shared/constants/toastMessages.constants";
import { ESignOutReason, signOut } from "@/shared/utils/signOut";

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

const isUnauthorizedError = (error?: FetchBaseQueryError) =>
  error &&
  error.status === 401 &&
  error.data &&
  typeof error.data === "object" &&
  "message" in error.data &&
  typeof error.data.message === "string" &&
  error.data.message.toLowerCase().match(/token expired/gi);

const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi) => {
  const result = await baseQuery(args, api, {});

  if (isUnauthorizedError(result.error) && Router.pathname !== SIGN_IN_ROUTE) {
    signOut({
      dispatch: api.dispatch,
      router: Router,
      reason: ESignOutReason.TokenExpired,
    });

    toast.error(TOAST_MESSAGE_SESSION_EXPIRED);
  }

  return result;
};

export default baseQueryWithErrorHandling;
